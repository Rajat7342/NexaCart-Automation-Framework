from api.api_client import APIClient
from database.database import Database


def test_api_response_database_validation():

    client = APIClient()
    db = Database()

    response = client.get(
        "https://jsonplaceholder.typicode.com/users/1"
    )

    assert response.status_code == 200

    data = response.json()

    test_id = 999

    db.execute_query(
        """
        INSERT OR REPLACE INTO users (id, name, email, password)
        VALUES (?, ?, ?, ?)
        """,
        (
            test_id,
            data["name"],
            data["email"],
            "API_Test@123"
        )
    )

    users = db.fetch_all(
        "SELECT * FROM users WHERE id = ?",
        (test_id,)
    )

    assert len(users) == 1
    assert users[0][1] == data["name"]
    assert users[0][2] == data["email"]

    # Clean up integration test data
    db.execute_query(
        "DELETE FROM users WHERE id = ?",
        (test_id,)
    )

    db.close()