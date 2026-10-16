
import re


def validate_sql(sql: str) -> str:
    sql = sql.strip()

    # Remove a single trailing semicolon.
    sql = sql.removesuffix(";").strip()

    if not sql:
        raise ValueError("SQL query is empty.")

    # Only one SELECT statement is allowed.
    if ";" in sql:
        raise ValueError("Multiple SQL statements are not allowed.")

    if not re.match(r"^SELECT\b", sql, re.IGNORECASE):
        raise ValueError("Only SELECT queries are allowed.")

    # Block SQL comments and potentially dangerous constructs.
    if re.search(r"--|/\*|\*/", sql):
        raise ValueError("SQL comments are not allowed.")

    if re.search(
        r"\b(INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|"
        r"ATTACH|DETACH|PRAGMA|REPLACE|VACUUM|"
        r"TRIGGER|REINDEX)\b",
        sql,
        re.IGNORECASE,
    ):
        raise ValueError("Unsafe SQL operation detected.")

    return sql
