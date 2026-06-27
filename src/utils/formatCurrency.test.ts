import { expect, it } from "vitest";
import { describe } from "vitest";
import { formatCurrency } from "./formatCurrency";

describe("formatCurrency", () => {
    it("format INR value", () => {
        expect(formatCurrency(100, "INR")).toBe("₹100.00");
    });

    it("formats USD value", () => {
        expect(formatCurrency(100, "USD")).toBe("$100.00");
    });

    it("throws for negative values", () => {
        expect(() => formatCurrency(-1, "USD")).toThrow("Negative values are not allowed");
    });
});