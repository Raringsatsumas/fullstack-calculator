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

def test_power_returns_200():
    response = client.post(
        "/api/v1/calculations",
        json={
            "operation": "power",
            "a": 2,
            "b": 8,
        },
    )

    assert response.status_code == 200

    assert response.json() == {
        "operation": "power",
        "result": 256.0,
    }


def test_square_root_returns_200():
    response = client.post(
        "/api/v1/calculations",
        json={
            "operation": "sqrt",
            "a": 25,
        },
    )

    assert response.status_code == 200

    assert response.json() == {
        "operation": "sqrt",
        "result": 5.0,
    }


def test_negative_square_root_returns_400():
    response = client.post(
        "/api/v1/calculations",
        json={
            "operation": "sqrt",
            "a": -4,
        },
    )

    assert response.status_code == 400

    assert response.json() == {
        "error": {
            "code": "NEGATIVE_SQUARE_ROOT",
            "message": (
                "Square root of a negative number "
                "is not supported."
            ),
        }
    }


def test_percentage_returns_200():
    response = client.post(
        "/api/v1/calculations",
        json={
            "operation": "percentage",
            "a": 20,
            "b": 150,
        },
    )

    assert response.status_code == 200

    assert response.json() == {
        "operation": "percentage",
        "result": 30.0,
    }

    assert response.status_code == 200

    assert response.json() == {
        "operation": "percentage",
        "result": 30.0,
    }