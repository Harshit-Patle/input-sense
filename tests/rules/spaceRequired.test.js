import { describe, it, expect } from "vitest";
import { spaceRequiredRule } from "../../rules/spaceRequiredRule.js";

describe("spaceRequiredRule", () => {
    it("flags input with no space", () => {
        expect(spaceRequiredRule("Harshit")).toBeTruthy();
        expect(spaceRequiredRule("John")).toBeTruthy();
    });

    it("returns null for input with a space", () => {
        expect(spaceRequiredRule("Harshit Patle")).toBe(null);
        expect(spaceRequiredRule("John Smith")).toBe(null);
    });

    it("returns null for input with multiple spaces", () => {
        expect(spaceRequiredRule("John Michael Smith")).toBe(null);
    });

    it("returns the correct message", () => {
        expect(spaceRequiredRule("Harshit")).toBe(
            "Please enter your full name (first and last name)"
        );
    });

    it("returns null for whitespace-only input", () => {
        expect(spaceRequiredRule("   ")).toBe(null);
    });

    it("returns null for empty input", () => {
        expect(spaceRequiredRule("")).toBe(null);
        expect(spaceRequiredRule(null)).toBe(null);
    });
});