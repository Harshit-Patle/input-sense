import { describe, it, expect } from "vitest";
import { placeholderWordRule } from "../../rules/placeholderWord.js"

describe("placeholderWordRule", () => {
    it("detects placeholder words", () => {
        const result = placeholderWordRule("test");
        expect(result).toBeTruthy();
    });

    it("returns null for normal input", () => {
        const result = placeholderWordRule("Harshit");
        expect(result).toBe(null);
    });

    it("returns null for empty input", () => {
        expect(placeholderWordRule("")).toBe(null);
        expect(placeholderWordRule(null)).toBe(null);
    });
});