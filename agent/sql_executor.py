
import sqlite3
import pandas as pd

#from sql_validator import validate_sql
from agent.sql_validator import validate_sql

def execute_sql(csv_path: str, sql: str) -> dict:
    """
    Load the CSV into a temporary SQLite database,
    execute a validated SELECT query, and return actual results.
    """

    safe_sql = validate_sql(sql)

    df = pd.read_csv(csv_path)

    if df.empty:
        raise ValueError("The CSV dataset is empty.")

    connection = sqlite3.connect(":memory:")

    try:
        df.to_sql(
            "dataset",
            connection,
            index=False,
            if_exists="replace",
        )

        connection.execute("PRAGMA query_only = ON")

        cursor = connection.execute(safe_sql)

        columns = [item[0] for item in cursor.description]
        rows = cursor.fetchmany(100)

        return {
            "columns": columns,
            "rows": [list(row) for row in rows],
            "rowCountReturned": len(rows),
            "truncated": len(rows) == 100,
        }

    finally:
        connection.close()
