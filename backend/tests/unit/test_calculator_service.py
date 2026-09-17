import pytest

from app.core.exceptions import DivisionByZeroError, MissingOperandError
from app.schemas.calculation import Operation
from app.services.calculator_service import CalculatorService


@pytest.fixture
def calculator():
    return CalculatorService()


def test_addition(calculator):
    result = calculator.calculate(Operation.ADD, 10, 5)

    assert result == 15


def test_subtraction(calculator):
    result = calculator.calculate(Operation.SUBTRACT, 10, 3)

    assert result == 7


def test_multiplication(calculator):
    result = calculator.calculate(Operation.MULTIPLY, 5, 4)

    assert result == 20


def test_division(calculator):
    result = calculator.calculate(Operation.DIVIDE, 10, 4)

    assert result == 2.5


def test_decimal_operands(calculator):
    result = calculator.calculate(Operation.ADD, 2.5, 1.5)

    assert result == 4.0


def test_negative_operands(calculator):
    result = calculator.calculate(Operation.ADD, -10, 3)

    assert result == -7


def test_division_by_zero(calculator):
    with pytest.raises(DivisionByZeroError):
        calculator.calculate(Operation.DIVIDE, 10, 0)


def test_missing_second_operand(calculator):
    with pytest.raises(MissingOperandError):
        calculator.calculate(Operation.ADD, 10)