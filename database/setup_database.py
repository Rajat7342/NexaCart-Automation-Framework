from database import Database


db = Database()


db.execute_query("""
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
)
""")


db.execute_query("""
INSERT INTO users (name, email, password)
VALUES (?, ?, ?)
""", (
    "Rajat",
    "rajat@example.com",
    "Test@123"
))


users = db.fetch_all("SELECT * FROM users")

for user in users:
    print(user)


db.close()