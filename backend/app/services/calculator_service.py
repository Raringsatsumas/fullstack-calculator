from app.core.exceptions import DivisionByZeroError, MissingOperandError
from app.schemas.calculation import Operation


class CalculatorService:

    def calculate(
        self,
        operation: Operation,
        a: float,
        b: float | None = None,
    ) -> float:

        if b is None:
            raise MissingOperandError("Operand 'b' is required.")

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

        raise ValueError(f"Unsupported operation: {operation}")