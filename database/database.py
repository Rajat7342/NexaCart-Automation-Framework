import sqlite3


class Database:

    def __init__(self, db_name="nexacart.db"):
        self.connection = sqlite3.connect(db_name)

    def execute_query(self, query, parameters=()):
        cursor = self.connection.cursor()
        cursor.execute(query, parameters)
        self.connection.commit()
        return cursor

    def fetch_all(self, query, parameters=()):
        cursor = self.connection.cursor()
        cursor.execute(query, parameters)
        return cursor.fetchall()

    def close(self):
        if self.connection:
            self.connection.close()