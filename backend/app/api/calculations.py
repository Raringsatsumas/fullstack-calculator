from fastapi import APIRouter

from app.schemas.calculation import (
    CalculationRequest,
    CalculationResponse,
)
from app.services.calculator_service import CalculatorService


router = APIRouter(
    prefix="/api/v1/calculations",
    tags=["calculations"],
)

calculator_service = CalculatorService()


@router.post(
    "",
    response_model=CalculationResponse,
)
def calculate(
    request: CalculationRequest,
) -> CalculationResponse:
    result = calculator_service.calculate(
        operation=request.operation,
        a=request.a,
        b=request.b,
    )

    return CalculationResponse(
        operation=request.operation,
        result=result,
    )