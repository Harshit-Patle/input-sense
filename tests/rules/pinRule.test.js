import { describe, it, expect } from "vitest";
import { pinRule } from "../../rules/pinRule.js";

describe("pinRule", () => {
    // Valid PINs
    it("returns null for valid 4-digit PIN", () => {
        expect(pinRule("1478")).toBe(null);
        expect(pinRule("2580")).toBeTruthy();
        expect(pinRule("3691")).toBe(null);
    });

    it("returns null for valid 6-digit PIN", () => {
        expect(pinRule("147258")).toBe(null);
        expect(pinRule("789012")).toBe(null);
    });

    it("allows non-sequential PIN with repeated digits", () => {
        // These should not be in the common PIN list
        expect(pinRule("1112")).toBe(null);
        expect(pinRule("1123")).toBe(null);
        expect(pinRule("1223")).toBe(null);
    });

    // Non-numeric
    it("flags input with letters", () => {
        expect(pinRule("abcd")).toBeTruthy();
        expect(pinRule("12ab")).toBeTruthy();
    });

    it("flags input with special characters", () => {
        expect(pinRule("12#4")).toBeTruthy();
        expect(pinRule("12 34")).toBeTruthy();
    });

    // Length validation
    it("flags PIN shorter than minLength", () => {
        expect(pinRule("123")).toBeTruthy();
        expect(pinRule("1")).toBeTruthy();
    });

    it("flags PIN longer than maxLength", () => {
        expect(pinRule("1234567")).toBeTruthy();
        expect(pinRule("12345678")).toBeTruthy();
    });

    // Repeated digits
    it("flags PIN with all repeated digits", () => {
        expect(pinRule("1111")).toBeTruthy();
        expect(pinRule("2222")).toBeTruthy();
        expect(pinRule("9999")).toBeTruthy();
    });

    it("allows PIN with some repeated digits", () => {
        expect(pinRule("1123")).toBe(null);
        expect(pinRule("1223")).toBe(null);
    });

    // Sequential digits
    it("flags PIN with sequential digits when noSequential is true", () => {
        expect(pinRule("1234", { noSequential: true })).toBeTruthy();
        expect(pinRule("4567", { noSequential: true })).toBeTruthy();
        expect(pinRule("6789", { noSequential: true })).toBeTruthy();
    });

    it("flags PIN with reverse sequential digits when noSequential is true", () => {
        expect(pinRule("9876", { noSequential: true })).toBeTruthy();
        expect(pinRule("5432", { noSequential: true })).toBeTruthy();
    });

    // Custom options
    it("respects custom minLength option", () => {
        const result = pinRule("123", { minLength: 3, maxLength: 6 });
        expect(result).toBe(null);
    });

    it("respects custom maxLength option", () => {
        const result = pinRule("1234567", { minLength: 4, maxLength: 6 });
        expect(result).toBeTruthy();
    });

    it("allows repeated digits when noRepeated is false", () => {
        const result = pinRule("1112", { noRepeated: false });
        expect(result).toBe(null);
    });

    it("allows sequential digits when noSequential is false", () => {
        const result = pinRule("1235", { noSequential: false });
        expect(result).toBe(null);
    });

    // Edge cases
    it("returns null for empty input", () => {
        expect(pinRule("")).toBe(null);
        expect(pinRule(null)).toBe(null);
    });

    it("returns null for whitespace-only input", () => {
        expect(pinRule(" ")).toBe(null);
    });

    it("flags common PINs", () => {
        expect(pinRule("1234")).toBeTruthy();
        expect(pinRule("1111")).toBeTruthy();
        expect(pinRule("2580")).toBeTruthy();
        expect(pinRule("123456")).toBeTruthy();
    });
});