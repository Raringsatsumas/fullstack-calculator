from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware

from app.api.calculations import router as calculations_router
from app.core.exception_handlers import (
    division_by_zero_handler,
    missing_operand_handler,
    negative_square_root_handler,
    validation_exception_handler,
)
from app.core.exceptions import (
    DivisionByZeroError,
    MissingOperandError, NegativeSquareRootError,
)


app = FastAPI(
    title="Calculator API",
    description="REST API for the Full Stack Calculator challenge.",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.add_exception_handler(
    DivisionByZeroError,
    division_by_zero_handler,
)

app.add_exception_handler(
    MissingOperandError,
    missing_operand_handler,
)

app.add_exception_handler(
    RequestValidationError,
    validation_exception_handler,
)

app.add_exception_handler(
    NegativeSquareRootError,
    negative_square_root_handler,
)


app.include_router(calculations_router)


@app.get("/health")
def health_check():
    return {"status": "ok"}