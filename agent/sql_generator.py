
import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI

load_dotenv()

def generate_sql(question: str, schema: str) -> str:
    """
    Convert a user's natural-language question into a SQLite SELECT query.
    """

    api_key = os.getenv("OPENROUTER_API_KEY")
    if not api_key:
        raise ValueError("OPENROUTER_API_KEY is missing from the environment.")

    model_name = os.getenv(
        "OPENROUTER_MODEL",
        "liquid/lfm-2.5-2.6b:free"
    )

    llm = ChatOpenAI(
        model=model_name,
        api_key=api_key,
        base_url="https://openrouter.ai/api/v1",
        temperature=0,
    )

    system_prompt = """
You are Agent 1, a natural-language-to-SQL specialist.

Your task is to convert the user's question into a SQLite query.

Rules:
1. Generate exactly one SQL SELECT statement.
2. Use only the provided table and column names.
3. Never generate INSERT, UPDATE, DELETE, DROP, ALTER,
   CREATE, or other data-modifying statements.
4. Do not invent columns or tables.
5. Return only the SQL query, without Markdown fences or explanations.
6. The dataset table name is dataset.
7. If the question cannot be answered from the schema,
   clearly return: CANNOT_ANSWER
"""

    prompt = f"""
Dataset schema:
{schema}

User question:
{question}

Generate the SQLite SELECT query.
"""

    response = llm.invoke(
        [
            ("system", system_prompt),
            ("human", prompt),
        ]
    )

    sql = str(response.content).strip()

    if sql.startswith("```"):
        sql = sql.replace("```sql", "").replace("```", "").strip()

    return sql
