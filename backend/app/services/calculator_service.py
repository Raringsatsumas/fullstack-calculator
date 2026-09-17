import math

from app.core.exceptions import (
    DivisionByZeroError,
    MissingOperandError,
    NegativeSquareRootError,
)
from app.schemas.calculation import Operation


class CalculatorService:
    def calculate(
        self,
        operation: Operation,
        a: float,
        b: float | None = None,
    ) -> float:

        # Unary operations
        if operation == Operation.SQRT:
            if a < 0:
                raise NegativeSquareRootError(
                    "Square root of a negative number is not supported."
                )

            return math.sqrt(a)

        # Binary operations require a second operand
        if b is None:
            raise MissingOperandError(
                "Operand 'b' is required."
            )

        if operation == Operation.ADD:
            return a + b

        if operation == Operation.SUBTRACT:
            return a - b

        if operation == Operation.MULTIPLY:
            return a * b

        if operation == Operation.DIVIDE:
            if b == 0:
                raise DivisionByZeroError(
                    "Division by zero is not allowed."
                )

            return a / b

        if operation == Operation.POWER:
            return a ** b

        if operation == Operation.PERCENTAGE:
            return (a / 100) * b

        raise ValueError(
            f"Unsupported operation: {operation}"
        )