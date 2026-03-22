import { describe, it, expect } from "vitest";
import { repeatedWordRule } from "../../rules/repeatedWordRule.js";

describe("repeatedWordRule", () => {
    it("detects repeated words", () => {
        expect(repeatedWordRule("test test")).toBeTruthy();
        expect(repeatedWordRule("hello hello hello")).toBeTruthy();
    });

    it("allows normal sentences", () => {
        expect(repeatedWordRule("hello world")).toBe(null);
        expect(repeatedWordRule("this is valid")).toBe(null);
    });
});