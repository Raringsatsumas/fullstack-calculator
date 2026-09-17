import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Calculator } from "../Calculator";
import { calculate } from "../../../services/calculatorApi";


vi.mock("../../../services/calculatorApi", () => ({
    calculate: vi.fn(),
}));


const mockedCalculate = vi.mocked(calculate);


describe("Calculator", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });


    it("renders the calculator controls", () => {
        render(<Calculator />);

        expect(
            screen.getByRole("button", { name: "1" }),
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", { name: "+" }),
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", { name: "=" }),
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", { name: "C" }),
        ).toBeInTheDocument();
    });


    it("allows the user to enter numbers", async () => {
        const user = userEvent.setup();

        const { container } = render(<Calculator />);

        await user.click(
            screen.getByRole("button", { name: "1" }),
        );

        await user.click(
            screen.getByRole("button", { name: "2" }),
        );

        const display = container.querySelector(
            ".calculator-display",
        );

        expect(display).toHaveTextContent("12");
    });


    it("calls the API with the selected operation and operands", async () => {
        const user = userEvent.setup();

        mockedCalculate.mockResolvedValue({
            operation: "add",
            result: 15,
        });

        render(<Calculator />);

        await user.click(
            screen.getByRole("button", { name: "1" }),
        );

        await user.click(
            screen.getByRole("button", { name: "0" }),
        );

        await user.click(
            screen.getByRole("button", { name: "+" }),
        );

        await user.click(
            screen.getByRole("button", { name: "5" }),
        );

        await user.click(
            screen.getByRole("button", { name: "=" }),
        );

        expect(mockedCalculate).toHaveBeenCalledTimes(1);

        expect(mockedCalculate).toHaveBeenCalledWith({
            operation: "add",
            a: 10,
            b: 5,
        });
    });


    it("displays the result returned by the API", async () => {
        const user = userEvent.setup();

        mockedCalculate.mockResolvedValue({
            operation: "multiply",
            result: 42,
        });

        const { container } = render(<Calculator />);

        await user.click(
            screen.getByRole("button", { name: "6" }),
        );

        await user.click(
            screen.getByRole("button", { name: "×" }),
        );

        await user.click(
            screen.getByRole("button", { name: "7" }),
        );

        await user.click(
            screen.getByRole("button", { name: "=" }),
        );

        const display = container.querySelector(
            ".calculator-display",
        );

        expect(display).toHaveTextContent("42");
    });


    it("displays backend errors to the user", async () => {
        const user = userEvent.setup();

        mockedCalculate.mockRejectedValue(
            new Error("Division by zero is not allowed."),
        );

        render(<Calculator />);

        await user.click(
            screen.getByRole("button", { name: "8" }),
        );

        await user.click(
            screen.getByRole("button", { name: "÷" }),
        );

        await user.click(
            screen.getByRole("button", { name: "0" }),
        );

        await user.click(
            screen.getByRole("button", { name: "=" }),
        );

        expect(
            await screen.findByText(
                "Division by zero is not allowed.",
            ),
        ).toBeInTheDocument();
    });


    it("clears the calculator state", async () => {
        const user = userEvent.setup();

        const { container } = render(<Calculator />);

        await user.click(
            screen.getByRole("button", { name: "9" }),
        );

        await user.click(
            screen.getByRole("button", { name: "C" }),
        );

        const display = container.querySelector(
            ".calculator-display",
        );

        expect(display).toHaveTextContent("0");
    });


    it("supports decimal input", async () => {
        const user = userEvent.setup();

        const { container } = render(<Calculator />);

        await user.click(
            screen.getByRole("button", { name: "2" }),
        );

        await user.click(
            screen.getByRole("button", { name: "." }),
        );

        await user.click(
            screen.getByRole("button", { name: "5" }),
        );

        const display = container.querySelector(
            ".calculator-display",
        );

        expect(display).toHaveTextContent("2.5");
    });
});