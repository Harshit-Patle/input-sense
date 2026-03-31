import { describe, it, expect } from "vitest";
import { vowelRatioRule } from "../../rules/vowelRatioRule.js";

describe("vowelRatioRule", () => {
    it("detects low vowel ratio input", () => {
        expect(vowelRatioRule("bcdfgh")).toBeTruthy();
        expect(vowelRatioRule("qwrtyp")).toBeTruthy();
    });

    it("allows normal words", () => {
        expect(vowelRatioRule("hello")).toBe(null);
        expect(vowelRatioRule("rahul")).toBe(null);
    });

    it("skips detection when input is under custom minLength", () => {
        const result = vowelRatioRule("bcdf", 5);
        expect(result).toBe(null);
    });

    it("allows input when vowel ratio is above custom minRatio", () => {
        const result = vowelRatioRule("bcdafg", 5, 0.1);
        expect(result).toBe(null);
    });

    it("flags input when vowel ratio is below custom minRatio", () => {
        const result = vowelRatioRule("bcdfgh", 5, 0.4);
        expect(result).toBeTruthy();
    });

    it("uses default minRatio when no config is provided", () => {
        const result = vowelRatioRule("bcdfgh");
        expect(result).toBeTruthy();
    });
});