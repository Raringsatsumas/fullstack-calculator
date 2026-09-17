import {
    afterEach,
    beforeEach,
    describe,
    expect,
    it,
    vi,
} from "vitest";

import { calculate } from "../calculatorApi";


describe("calculatorApi", () => {
    beforeEach(() => {
        vi.stubGlobal("fetch", vi.fn());
    });


    afterEach(() => {
        vi.unstubAllGlobals();
    });


    it("sends a POST request to the calculations endpoint", async () => {
        const fetchMock = vi.mocked(fetch);

        fetchMock.mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue({
                operation: "add",
                result: 15,
            }),
        } as unknown as Response);


        await calculate({
            operation: "add",
            a: 10,
            b: 5,
        });


        expect(fetchMock).toHaveBeenCalledTimes(1);

        expect(fetchMock).toHaveBeenCalledWith(
            "http://localhost:8000/api/v1/calculations",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    operation: "add",
                    a: 10,
                    b: 5,
                }),
            },
        );
    });


    it("returns the calculation response", async () => {
        const fetchMock = vi.mocked(fetch);

        fetchMock.mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue({
                operation: "multiply",
                result: 20,
            }),
        } as unknown as Response);


        const response = await calculate({
            operation: "multiply",
            a: 4,
            b: 5,
        });


        expect(response).toEqual({
            operation: "multiply",
            result: 20,
        });
    });


    it("throws the backend error message when the request fails", async () => {
        const fetchMock = vi.mocked(fetch);

        fetchMock.mockResolvedValue({
            ok: false,
            status: 400,
            json: vi.fn().mockResolvedValue({
                error: {
                    code: "DIVISION_BY_ZERO",
                    message: "Division by zero is not allowed.",
                },
            }),
        } as unknown as Response);


        await expect(
            calculate({
                operation: "divide",
                a: 10,
                b: 0,
            }),
        ).rejects.toThrow(
            "Division by zero is not allowed.",
        );
    });


    it("propagates network errors", async () => {
        const fetchMock = vi.mocked(fetch);

        fetchMock.mockRejectedValue(
            new Error("Network error"),
        );


        await expect(
            calculate({
                operation: "add",
                a: 10,
                b: 5,
            }),
        ).rejects.toThrow("Network error");
    });
});