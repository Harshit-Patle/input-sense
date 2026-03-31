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

    it("detects expanded placeholder words", () => {
        expect(placeholderWordRule("foo")).toBeTruthy();
        expect(placeholderWordRule("lorem")).toBeTruthy();
        expect(placeholderWordRule("dummy")).toBeTruthy();
        expect(placeholderWordRule("null")).toBeTruthy();
        expect(placeholderWordRule("guest")).toBeTruthy();
    });

    it("accepts custom placeholder words", () => {
        expect(placeholderWordRule("mycustomword", ["mycustomword"])).toBeTruthy();
    });

    it("returns null for custom words not in list", () => {
        expect(placeholderWordRule("mycustomword")).toBe(null);
    });

    it("returns null for empty input with custom words", () => {
        expect(placeholderWordRule("", ["foo"])).toBe(null);
    });
});