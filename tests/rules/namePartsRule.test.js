import { describe, it, expect } from "vitest";
import { namePartsRule } from "../../rules/namePartsRule.js";

describe("namePartsRule", () => {
    it("returns null for valid full name", () => {
        expect(namePartsRule("Harshit Patle")).toBe(null);
        expect(namePartsRule("John Michael Smith")).toBe(null);
        expect(namePartsRule("john smith")).toBe(null);
    });

    it("returns null for hyphenated names", () => {
        expect(namePartsRule("Mary-Jane Watson")).toBe(null);
        expect(namePartsRule("Jean-Luc Picard")).toBe(null);
    });

    it("returns null for names with apostrophes", () => {
        expect(namePartsRule("O'Brien Connor")).toBe(null);
    });

    it("returns null for names with dots", () => {
        expect(namePartsRule("St. John Smith")).toBe(null);
    });

    it("returns null for accented characters", () => {
        expect(namePartsRule("María García")).toBe(null);
        expect(namePartsRule("Anne van der Berg")).toBe(null);
    });

    it("flags name parts shorter than 2 chars", () => {
        expect(namePartsRule("J Smith")).toBeTruthy();
        expect(namePartsRule("John A Smith")).toBeTruthy();
    });

    it("flags digits in name parts", () => {
        expect(namePartsRule("John 123")).toBeTruthy();
        expect(namePartsRule("123 Smith")).toBeTruthy();
        expect(namePartsRule("John3rd Smith")).toBeTruthy();
    });

    it("flags name longer than 100 chars", () => {
        expect(namePartsRule("A".repeat(50) + " " + "B".repeat(51))).toBeTruthy();
    });

    it("normalizes multiple spaces", () => {
        expect(namePartsRule("John  Smith")).toBe(null);
        expect(namePartsRule("John   Michael   Smith")).toBe(null);
    });

    it("returns null for empty input", () => {
        expect(namePartsRule("")).toBe(null);
        expect(namePartsRule(null)).toBe(null);
    });
    
    it("flags sub-part with no letters", () => {
        expect(namePartsRule("John @@ Smith")).toBeTruthy();
    });
});