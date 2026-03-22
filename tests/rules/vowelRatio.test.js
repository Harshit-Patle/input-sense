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
});