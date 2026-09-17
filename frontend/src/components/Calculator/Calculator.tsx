import { useState } from "react";

import { calculate } from "../../services/calculatorApi";
import type { Operation } from "../../types/calculator";

import "./Calculator.css";


export function Calculator() {
    const [display, setDisplay] = useState("0");
    const [firstOperand, setFirstOperand] = useState<number | null>(null);
    const [operation, setOperation] = useState<Operation | null>(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const inputDigit = (digit: string) => {
        if (loading) return;

        setError(null);

        if (waitingForOperand) {
            setDisplay(digit);
            setWaitingForOperand(false);
            return;
        }

        setDisplay((currentDisplay) => {
            if (currentDisplay === "0") {
                return digit;
            }

            if (currentDisplay === "-") {
                return `-${digit}`;
            }

            return currentDisplay + digit;
        });
    };


    const inputDecimal = () => {
        if (loading) return;

        setError(null);

        if (waitingForOperand) {
            setDisplay("0.");
            setWaitingForOperand(false);
            return;
        }

        if (!display.includes(".")) {
            setDisplay((currentDisplay) => currentDisplay + ".");
        }
    };


    const selectOperation = (selectedOperation: Operation) => {
        if (loading) return;

        setError(null);

        const currentValue = Number(display);

        /*
         * If no first operand has been selected yet,
         * the current display becomes the first operand.
         */
        if (firstOperand === null) {
            setFirstOperand(currentValue);
        }

        /*
         * If the user already selected an operation but has not
         * entered the second operand yet, simply replace the
         * selected operation.
         */
        setOperation(selectedOperation);
        setWaitingForOperand(true);
    };

    const handleSubtract = () => {
        if (loading) return;

        setError(null);

        // If we are starting a new number, use minus as a negative sign.
        if (firstOperand === null && display === "0") {
            setDisplay("-");
            setWaitingForOperand(false);
            return;
        }

        // Otherwise, use minus as the subtraction operation.
        selectOperation("subtract");
    };


    const performCalculation = async () => {
        if (
            loading ||
            firstOperand === null ||
            operation === null
        ) {
            return;
        }

        const secondOperand = Number(display);

        try {
            setLoading(true);
            setError(null);

            const response = await calculate({
                operation,
                a: firstOperand,
                b: secondOperand,
            });

            setDisplay(String(response.result));

            /*
             * Reset the binary operation after receiving
             * the result from the backend.
             */
            setFirstOperand(null);
            setOperation(null);
            setWaitingForOperand(true);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "An unexpected error occurred.",
            );
        } finally {
            setLoading(false);
        }
    };


    const performSquareRoot = async () => {
        if (loading) return;

        const currentValue = Number(display);

        try {
            setLoading(true);
            setError(null);

            const response = await calculate({
                operation: "sqrt",
                a: currentValue,
            });

            setDisplay(String(response.result));

            /*
             * Square root is unary, so there is no second operand.
             * Clear any previous binary operation.
             */
            setFirstOperand(null);
            setOperation(null);
            setWaitingForOperand(true);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "An unexpected error occurred.",
            );
        } finally {
            setLoading(false);
        }
    };


    const clearCalculator = () => {
        setDisplay("0");
        setFirstOperand(null);
        setOperation(null);
        setWaitingForOperand(false);
        setError(null);
    };


    return (
        <div className="calculator">
            <div
                className="calculator-display"
                aria-live="polite"
            >
                {loading ? "..." : display}
            </div>

            {error && (
                <div
                    className="error-message"
                    role="alert"
                >
                    {error}
                </div>
            )}

            <div className="calculator-grid">
                {/* Advanced operations */}

                <button
                    className="function-button"
                    type="button"
                    onClick={clearCalculator}
                    disabled={loading}
                >
                    C
                </button>

                <button
                    className="function-button"
                    type="button"
                    onClick={performSquareRoot}
                    disabled={loading}
                    aria-label="Square root"
                >
                    √
                </button>

                <button
                    className="function-button"
                    type="button"
                    onClick={() => selectOperation("percentage")}
                    disabled={loading}
                    aria-label="Percentage"
                >
                    %
                </button>

                <button
                    className="operator-button"
                    type="button"
                    onClick={() => selectOperation("power")}
                    disabled={loading}
                    aria-label="Power"
                >
                    xʸ
                </button>

                {/* Row 2 */}

                <button
                    type="button"
                    onClick={() => inputDigit("7")}
                    disabled={loading}
                >
                    7
                </button>

                <button
                    type="button"
                    onClick={() => inputDigit("8")}
                    disabled={loading}
                >
                    8
                </button>

                <button
                    type="button"
                    onClick={() => inputDigit("9")}
                    disabled={loading}
                >
                    9
                </button>

                <button
                    className="operator-button"
                    type="button"
                    onClick={() => selectOperation("divide")}
                    disabled={loading}
                >
                    ÷
                </button>

                {/* Row 3 */}

                <button
                    type="button"
                    onClick={() => inputDigit("4")}
                    disabled={loading}
                >
                    4
                </button>

                <button
                    type="button"
                    onClick={() => inputDigit("5")}
                    disabled={loading}
                >
                    5
                </button>

                <button
                    type="button"
                    onClick={() => inputDigit("6")}
                    disabled={loading}
                >
                    6
                </button>

                <button
                    className="operator-button"
                    type="button"
                    onClick={() => selectOperation("multiply")}
                    disabled={loading}
                >
                    ×
                </button>

                {/* Row 4 */}

                <button
                    type="button"
                    onClick={() => inputDigit("1")}
                    disabled={loading}
                >
                    1
                </button>

                <button
                    type="button"
                    onClick={() => inputDigit("2")}
                    disabled={loading}
                >
                    2
                </button>

                <button
                    type="button"
                    onClick={() => inputDigit("3")}
                    disabled={loading}
                >
                    3
                </button>

                <button
                    className="operator-button"
                    type="button"
                    onClick={handleSubtract}
                    disabled={loading}
                >
                    −
                </button>

                {/* Row 5 */}

                <button
                    type="button"
                    onClick={() => inputDigit("0")}
                    disabled={loading}
                >
                    0
                </button>

                <button
                    type="button"
                    onClick={inputDecimal}
                    disabled={loading}
                >
                    .
                </button>

                <button
                    className="equals-button"
                    type="button"
                    onClick={performCalculation}
                    disabled={
                        loading ||
                        firstOperand === null ||
                        operation === null
                    }
                >
                    =
                </button>

                <button
                    className="operator-button"
                    type="button"
                    onClick={() => selectOperation("add")}
                    disabled={loading}
                >
                    +
                </button>
            </div>
        </div>
    );
}

export default Calculator;