import { useState } from "react";

import { calculate } from "../../services/calculatorApi";
import type { Operation } from "../../types/calculator";

import "./Calculator.css";


export function Calculator() {
    const [display, setDisplay] = useState("0");
    const [firstOperand, setFirstOperand] =
        useState<number | null>(null);
    const [operation, setOperation] =
        useState<Operation | null>(null);
    const [waitingForOperand, setWaitingForOperand] =
        useState(false);
    const [error, setError] =
        useState<string | null>(null);
    const [loading, setLoading] =
        useState(false);


    function inputDigit(digit: string) {
        setError(null);

        if (waitingForOperand) {
            setDisplay(digit);
            setWaitingForOperand(false);
            return;
        }

        setDisplay(
            display === "0"
                ? digit
                : display + digit
        );
    }


    function inputDecimal() {
        if (waitingForOperand) {
            setDisplay("0.");
            setWaitingForOperand(false);
            return;
        }

        if (!display.includes(".")) {
            setDisplay(display + ".");
        }
    }


    function selectOperation(
        selectedOperation: Operation
    ) {
        setFirstOperand(Number(display));
        setOperation(selectedOperation);
        setWaitingForOperand(true);
        setError(null);
    }


    async function performCalculation() {
        if (
            firstOperand === null ||
            operation === null
        ) {
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const response = await calculate({
                operation,
                a: firstOperand,
                b: Number(display),
            });

            setDisplay(String(response.result));
            setFirstOperand(null);
            setOperation(null);
            setWaitingForOperand(true);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "An unexpected error occurred."
            );
        } finally {
            setLoading(false);
        }
    }


    function clearCalculator() {
        setDisplay("0");
        setFirstOperand(null);
        setOperation(null);
        setWaitingForOperand(false);
        setError(null);
    }


    return (
        <div className="calculator">
            <div className="calculator-display">
                {display}
            </div>

            {error && (
                <div className="calculator-error">
                    {error}
                </div>
            )}

            <div className="calculator-grid">

                <button
                    className="clear"
                    onClick={clearCalculator}
                >
                    C
                </button>

                <button
                    onClick={() =>
                        selectOperation("divide")
                    }
                >
                    ÷
                </button>

                {[7, 8, 9].map((number) => (
                    <button
                        key={number}
                        onClick={() =>
                            inputDigit(String(number))
                        }
                    >
                        {number}
                    </button>
                ))}

                <button
                    onClick={() =>
                        selectOperation("multiply")
                    }
                >
                    ×
                </button>

                {[4, 5, 6].map((number) => (
                    <button
                        key={number}
                        onClick={() =>
                            inputDigit(String(number))
                        }
                    >
                        {number}
                    </button>
                ))}

                <button
                    onClick={() =>
                        selectOperation("subtract")
                    }
                >
                    −
                </button>

                {[1, 2, 3].map((number) => (
                    <button
                        key={number}
                        onClick={() =>
                            inputDigit(String(number))
                        }
                    >
                        {number}
                    </button>
                ))}

                <button
                    onClick={() =>
                        selectOperation("add")
                    }
                >
                    +
                </button>

                <button
                    className="zero"
                    onClick={() => inputDigit("0")}
                >
                    0
                </button>

                <button onClick={inputDecimal}>
                    .
                </button>

                <button
                    className="equals"
                    onClick={performCalculation}
                    disabled={loading}
                >
                    {loading ? "..." : "="}
                </button>

            </div>
        </div>
    );
}