
from pathlib import Path

from agent.graphh import copilot_graph


ROOT = Path(__file__).resolve().parent.parent
CSV_PATH = ROOT / "shri.csv"

SCHEMA = """
Table: dataset
Columns:
- Product (TEXT)
- Category (TEXT)
- Region (TEXT)
- Revenue (REAL)
- Orders (INTEGER)
- Discount_Percent (REAL)
- Rating (REAL)
"""


def main():
    question = input("Ask a question about shri.csv: ").strip()

    if not question:
        print("Please enter a question.")
        return

    result = copilot_graph.invoke({
        "question": question,
        "csv_path": str(CSV_PATH),
        "schema": SCHEMA,
    })

    if result.get("error"):
        print("\nError:", result["error"])
        return

    print("\nGenerated SQL:")
    print(result["sql_query"])

    print("\nActual SQL result:")
    print(result["query_result"])

    print("\nFinal answer:")
    print(result["final_answer"])


if __name__ == "__main__":
    main()
