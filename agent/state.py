
from typing import TypedDict, Any


class AgentState(TypedDict, total=False):
    question: str
    csv_path: str
    schema: str
    sql_query: str
    query_result: dict[str, Any]
    final_answer: str
    error: str
