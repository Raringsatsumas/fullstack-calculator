import type {
    ApiErrorResponse,
    CalculationRequest,
    CalculationResponse,
} from "../types/calculator";


const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:8000";


export async function calculate(
    request: CalculationRequest
): Promise<CalculationResponse> {
    const response = await fetch(
        `${API_URL}/api/v1/calculations`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
        }
    );

    if (!response.ok) {
        const error: ApiErrorResponse = await response.json();

        throw new Error(error.error.message);
    }

    return response.json();
}