from enum import Enum

from pydantic import BaseModel


class Operation(str, Enum):
    ADD = "add"
    SUBTRACT = "subtract"
    MULTIPLY = "multiply"
    DIVIDE = "divide"
    POWER = "power"
    SQRT = "sqrt"
    PERCENTAGE = "percentage"


class CalculationRequest(BaseModel):
    operation: Operation
    a: float
    b: float | None = None


class CalculationResponse(BaseModel):
    operation: Operation
    result: float