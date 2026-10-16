
from langgraph.graph import StateGraph, START, END
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
import os

from agent.state import AgentState
from agent.sql_generator import generate_sql
from agent.sql_executor import execute_sql

load_dotenv()


def generate_sql_node(state: AgentState):
    try:
        sql = generate_sql(
            question=state["question"],
            schema=state["schema"],
        )
        return {"sql_query": sql, "error": ""}
    except Exception as exc:
        return {"error": f"SQL generation failed: {exc}"}


def execute_sql_node(state: AgentState):
    try:
        result = execute_sql(
            csv_path=state["csv_path"],
            sql=state["sql_query"],
        )
        return {"query_result": result, "error": ""}
    except Exception as exc:
        return {"error": f"SQL execution failed: {exc}"}


def generate_answer_node(state: AgentState):
    try:
        api_key = os.getenv("OPENROUTER_API_KEY")
        if not api_key:
            raise ValueError("OPENROUTER_API_KEY is missing")

        model = ChatOpenAI(
            model=os.getenv(
                "OPENROUTER_MODEL",
                "liquid/lfm-2.5-2.6b:free",
            ),
            api_key=api_key,
            base_url="https://openrouter.ai/api/v1",
            temperature=0,
        )

        prompt = f"""
Answer the user's question using ONLY the SQL result below.

User question:
{state["question"]}

SQL query:
{state["sql_query"]}

Actual database result:
{state["query_result"]}

Rules:
- Do not invent data or statistics.
- If the result has no rows, clearly say no matching records were found.
- Explain the result in concise, natural language.
"""

        response = model.invoke(prompt)
        return {"final_answer": str(response.content).strip()}

    except Exception as exc:
        return {"error": f"Answer generation failed: {exc}"}


def route_after_sql(state: AgentState):
    return "end" if state.get("error") else "execute"


def route_after_execution(state: AgentState):
    return "end" if state.get("error") else "answer"


builder = StateGraph(AgentState)

builder.add_node("generate_sql", generate_sql_node)
builder.add_node("execute_sql", execute_sql_node)
builder.add_node("generate_answer", generate_answer_node)

builder.add_edge(START, "generate_sql")

builder.add_conditional_edges(
    "generate_sql",
    route_after_sql,
    {"execute": "execute_sql", "end": END},
)

builder.add_conditional_edges(
    "execute_sql",
    route_after_execution,
    {"answer": "generate_answer", "end": END},
)

builder.add_edge("generate_answer", END)

copilot_graph = builder.compile()
