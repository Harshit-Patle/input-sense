import { describe, it, expect } from "vitest";
import { phoneRule } from "../../rules/phoneRule.js";

describe("phoneRule", () => {
    // Valid phone numbers
    it("returns null for valid 10-digit phone", () => {
        expect(phoneRule("1234567890")).toBe(null);
    });

    it("returns null for valid 11-digit phone", () => {
        expect(phoneRule("12345678901")).toBe(null);
    });

    it("returns null for phone with spaces", () => {
        expect(phoneRule("123 456 7890")).toBe(null);
    });

    it("returns null for phone with dashes", () => {
        expect(phoneRule("123-456-7890")).toBe(null);
    });

    it("returns null for phone with parentheses", () => {
        expect(phoneRule("(123) 456-7890")).toBe(null);
        expect(phoneRule("(123)456-7890")).toBe(null);
    });

    it("returns null for phone with plus sign", () => {
        expect(phoneRule("+1 234-567-8900")).toBe(null);
    });

    it("returns null for international format", () => {
        expect(phoneRule("+91 98765 43210")).toBe(null);
        expect(phoneRule("+44 20 7946 0958")).toBe(null);
    });

    // Invalid characters
    it("flags input with letters", () => {
        expect(phoneRule("abc123")).toBeTruthy();
        expect(phoneRule("123-456-ABCD")).toBeTruthy();
    });

    it("flags input with special characters not allowed", () => {
        expect(phoneRule("123@456#7890")).toBeTruthy();
        expect(phoneRule("123_456_7890")).toBeTruthy();
    });

    // Length validation
    it("flags phone with fewer than minDigits", () => {
        expect(phoneRule("123")).toBeTruthy();
        expect(phoneRule("123456789")).toBeTruthy();
    });

    it("flags phone with more than maxDigits", () => {
        expect(phoneRule("1234567890123456")).toBeTruthy();
    });

    // Repeated digits (optional)
    it("allows repeated digits by default", () => {
        expect(phoneRule("1111111111")).toBe(null);
    });

    it("flags repeated digits when noRepeated is true", () => {
        const result = phoneRule("1111111111", { noRepeated: true });
        expect(result).toBeTruthy();
    });

    // Edge cases
    it("returns null for empty input", () => {
        expect(phoneRule("")).toBe(null);
        expect(phoneRule(null)).toBe(null);
    });

    it("returns null for whitespace-only input", () => {
        expect(phoneRule(" ")).toBe(null);
    });

    // Custom options
    it("respects custom minDigits option", () => {
        const result = phoneRule("12345", { minDigits: 5, maxDigits: 15 });
        expect(result).toBe(null);
    });

    it("respects custom maxDigits option", () => {
        const result = phoneRule("123456789012345", { minDigits: 10, maxDigits: 15 });
        expect(result).toBe(null);
    });

    it("disallows plus when allowPlus is false", () => {
        const result = phoneRule("+1 234-567-8900", { allowPlus: false });
        expect(result).toBeTruthy();
    });

    it("disallows spaces when allowSpaces is false", () => {
        const result = phoneRule("123 456 7890", { allowSpaces: false });
        expect(result).toBeTruthy();
    });

    it("disallows dashes when allowDashes is false", () => {
        const result = phoneRule("123-456-7890", { allowDashes: false });
        expect(result).toBeTruthy();
    });

    it("disallows parentheses when allowParens is false", () => {
        const result = phoneRule("(123) 456-7890", { allowParens: false });
        expect(result).toBeTruthy();
    });

    it("flags multiple '+' signs", () => {
        expect(phoneRule("+1+234567890")).toBeTruthy();
        expect(phoneRule("+1+234+567+890")).toBeTruthy();
    });

    it("flags empty parentheses", () => {
        expect(phoneRule("()1234567890")).toBeTruthy();
    });

    it("flags consecutive separators", () => {
        expect(phoneRule("123--456-7890")).toBeTruthy();
        expect(phoneRule("123  456 7890")).toBeTruthy();
    });
});