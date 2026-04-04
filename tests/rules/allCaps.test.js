import { describe, it, expect } from "vitest";
import { allCapsRule } from "../../rules/allCapsRule.js";

describe("allCapsRule", () => {
    it("detects all caps input", () => {
        expect(allCapsRule("ASDF")).toBeTruthy();
        expect(allCapsRule("HELLO")).toBeTruthy();
        expect(allCapsRule("ADMIN")).toBeTruthy();
    });

    it("allows mixed case input", () => {
        expect(allCapsRule("Harshit")).toBe(null);
        expect(allCapsRule("Hello")).toBe(null);
    });

    it("allows lowercase input", () => {
        expect(allCapsRule("hello")).toBe(null);
    });

    it("returns null for input under minLength", () => {
        expect(allCapsRule("USA")).toBe(null);
        expect(allCapsRule("OK")).toBe(null);
    });

    it("respects custom minLength config", () => {
        expect(allCapsRule("HI", 2)).toBeTruthy();
        expect(allCapsRule("HI", 3)).toBe(null);
    });

    it("strips non-letter characters before checking", () => {
        expect(allCapsRule("HELLO123")).toBeTruthy();
        expect(allCapsRule("HELLO!")).toBeTruthy();
    });

    it("returns null for input with no letters", () => {
        expect(allCapsRule("1234")).toBe(null);
    });

    it("returns null for empty input", () => {
        expect(allCapsRule("")).toBe(null);
        expect(allCapsRule(null)).toBe(null);
    });
});