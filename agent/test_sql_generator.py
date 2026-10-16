
from sql_generator import generate_sql

schema = """
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

question = "Which product generated the highest revenue?"

sql = generate_sql(question, schema)

print("\nGenerated SQL:")
print(sql)
