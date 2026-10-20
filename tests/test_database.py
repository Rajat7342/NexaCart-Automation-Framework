import sqlite3

from database.database import Database
from utils.test_data_loader import load_test_data


TEST_DATA = load_test_data(
    "test_data/users.json"
)


def test_user_exists():

    db = Database()

    users = db.fetch_all(
        "SELECT * FROM users WHERE email = ?",
        (TEST_DATA["valid_user"]["email"],)
    )

    assert len(users) == 1
    assert users[0][1] == TEST_DATA["valid_user"]["name"]
    assert users[0][2] == TEST_DATA["valid_user"]["email"]

    db.close()


def test_duplicate_email():

    db = Database()

    try:
        db.execute_query(
            """
            INSERT INTO users (name, email, password)
            VALUES (?, ?, ?)
            """,
            (
                "Another Rajat",
                TEST_DATA["valid_user"]["email"],
                "Test@123"
            )
        )

        assert False, "Duplicate email should not be allowed"

    except sqlite3.IntegrityError:
        assert True

    finally:
        db.close()


def test_delete_user():

    db = Database()

    db.execute_query(
        "DELETE FROM users WHERE email = ?",
        (TEST_DATA["new_user"]["email"],)
    )

    users = db.fetch_all(
        "SELECT * FROM users WHERE email = ?",
        (TEST_DATA["new_user"]["email"],)
    )

    assert len(users) == 0

    db.close()


def test_insert_user():

    db = Database()

    # Remove test data if it already exists
    db.execute_query(
        "DELETE FROM users WHERE email = ?",
        (TEST_DATA["new_user"]["email"],)
    )

    db.execute_query(
        """
        INSERT INTO users (name, email, password)
        VALUES (?, ?, ?)
        """,
        (
            TEST_DATA["new_user"]["name"],
            TEST_DATA["new_user"]["email"],
            TEST_DATA["new_user"]["password"]
        )
    )

    users = db.fetch_all(
        "SELECT * FROM users WHERE email = ?",
        (TEST_DATA["new_user"]["email"],)
    )

    assert len(users) == 1
    assert users[0][1] == TEST_DATA["new_user"]["name"]
    assert users[0][2] == TEST_DATA["new_user"]["email"]

    db.close()


def test_update_user():

    db = Database()

    db.execute_query(
        """
        UPDATE users
        SET name = ?
        WHERE email = ?
        """,
        (
            "Rajat Updated",
            TEST_DATA["valid_user"]["email"]
        )
    )

    users = db.fetch_all(
        "SELECT * FROM users WHERE email = ?",
        (TEST_DATA["valid_user"]["email"],)
    )

    assert len(users) == 1
    assert users[0][1] == "Rajat Updated"

    # Restore original data
    db.execute_query(
        """
        UPDATE users
        SET name = ?
        WHERE email = ?
        """,
        (
            TEST_DATA["valid_user"]["name"],
            TEST_DATA["valid_user"]["email"]
        )
    )

    db.close()