from api.api_client import APIClient
from utils.test_data_loader import load_test_data


TEST_DATA = load_test_data(
    "test_data/users.json"
)


def test_get_user():

    client = APIClient()

    response = client.get(
        "https://jsonplaceholder.typicode.com/users/1"
    )

    assert response.status_code == 200

    data = response.json()

    assert data["id"] == 1
    assert "name" in data
    assert "email" in data


def test_create_user():

    client = APIClient()

    user_data = {
        "name": TEST_DATA["valid_user"]["name"],
        "email": TEST_DATA["valid_user"]["email"]
    }

    response = client.post(
        "https://jsonplaceholder.typicode.com/users",
        user_data
    )

    assert response.status_code == 201

    data = response.json()

    assert data["name"] == TEST_DATA["valid_user"]["name"]
    assert data["email"] == TEST_DATA["valid_user"]["email"]


def test_delete_user():

    client = APIClient()

    response = client.delete(
        "https://jsonplaceholder.typicode.com/users/1"
    )

    assert response.status_code == 200


def test_update_user():

    client = APIClient()

    updated_data = {
        "name": TEST_DATA["valid_user"]["name"] + " Updated",
        "email": "updated@example.com"
    }

    response = client.put(
        "https://jsonplaceholder.typicode.com/users/1",
        updated_data
    )

    assert response.status_code == 200

    data = response.json()

    assert data["name"] == "Rajat Updated"
    assert data["email"] == "updated@example.com"