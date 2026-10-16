
from sql_executor import execute_sql

csv_path = "shri.csv"

sql = """
SELECT Product, Revenue
FROM dataset
ORDER BY Revenue DESC
LIMIT 1;
"""

result = execute_sql(csv_path, sql)

print("Query result:")
print(result)
