class CalculatorError(Exception):
    """Base exception for calculator domain errors."""


class DivisionByZeroError(CalculatorError):
    """Raised when attempting to divide by zero."""


class MissingOperandError(CalculatorError):
    """Raised when a required operand is missing."""


class NegativeSquareRootError(CalculatorError):
    """Raised when calculating the square root of a negative number."""