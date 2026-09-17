from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_addition_returns_200():
    response = client.post(
        "/api/v1/calculations",
        json={
            "operation": "add",
            "a": 10,
            "b": 5,
        },
    )

    assert response.status_code == 200
    assert response.json() == {
        "operation": "add",
        "result": 15.0,
    }


def test_subtraction_returns_200():
    response = client.post(
        "/api/v1/calculations",
        json={
            "operation": "subtract",
            "a": 10,
            "b": 3,
        },
    )

    assert response.status_code == 200
    assert response.json() == {
        "operation": "subtract",
        "result": 7.0,
    }


def test_multiplication_returns_200():
    response = client.post(
        "/api/v1/calculations",
        json={
            "operation": "multiply",
            "a": 4,
            "b": 5,
        },
    )

    assert response.status_code == 200
    assert response.json() == {
        "operation": "multiply",
        "result": 20.0,
    }


def test_division_returns_200():
    response = client.post(
        "/api/v1/calculations",
        json={
            "operation": "divide",
            "a": 10,
            "b": 4,
        },
    )

    assert response.status_code == 200
    assert response.json() == {
        "operation": "divide",
        "result": 2.5,
    }


def test_division_by_zero_returns_400():
    response = client.post(
        "/api/v1/calculations",
        json={
            "operation": "divide",
            "a": 10,
            "b": 0,
        },
    )

    assert response.status_code == 400

    assert response.json() == {
        "error": {
            "code": "DIVISION_BY_ZERO",
            "message": "Division by zero is not allowed.",
        }
    }


def test_missing_second_operand_returns_422():
    response = client.post(
        "/api/v1/calculations",
        json={
            "operation": "add",
            "a": 10,
        },
    )

    assert response.status_code == 422

    assert response.json() == {
        "error": {
            "code": "MISSING_OPERAND",
            "message": "Operand 'b' is required.",
        }
    }


def test_invalid_operand_type_returns_422():
    response = client.post(
        "/api/v1/calculations",
        json={
            "operation": "add",
            "a": "hello",
            "b": 5,
        },
    )

    assert response.status_code == 422

    assert response.json() == {
        "error": {
            "code": "VALIDATION_ERROR",
            "message": "The request contains invalid or missing fields.",
        }
    }


def test_invalid_operation_returns_422():
    response = client.post(
        "/api/v1/calculations",
        json={
            "operation": "banana",
            "a": 10,
            "b": 5,
        },
    )

    assert response.status_code == 422