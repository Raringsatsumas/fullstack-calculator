from fastapi import Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError

from app.core.exceptions import (
    DivisionByZeroError,
    MissingOperandError,
)


async def division_by_zero_handler(
    request: Request,
    exc: DivisionByZeroError,
) -> JSONResponse:
    return JSONResponse(
        status_code=400,
        content={
            "error": {
                "code": "DIVISION_BY_ZERO",
                "message": str(exc),
            }
        },
    )


async def missing_operand_handler(
    request: Request,
    exc: MissingOperandError,
) -> JSONResponse:
    return JSONResponse(
        status_code=422,
        content={
            "error": {
                "code": "MISSING_OPERAND",
                "message": str(exc),
            }
        },
    )


async def validation_exception_handler(
    request: Request,
    exc: RequestValidationError,
) -> JSONResponse:
    return JSONResponse(
        status_code=422,
        content={
            "error": {
                "code": "VALIDATION_ERROR",
                "message": "The request contains invalid or missing fields.",
            }
        },
    )