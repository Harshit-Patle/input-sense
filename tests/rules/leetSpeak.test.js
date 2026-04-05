import { describe, it, expect } from "vitest";
import { leetSpeakRule } from "../../rules/leetSpeakRule.js";

describe("leetSpeakRule", () => {
    it("detects leet speak admin variants", () => {
        expect(leetSpeakRule("4dmin")).toBeTruthy();
        expect(leetSpeakRule("@dmin")).toBeTruthy();
    });

    it("detects leet speak test variants", () => {
        expect(leetSpeakRule("t3st")).toBeTruthy();
        expect(leetSpeakRule("t35t")).toBeTruthy();
    });

    it("detects leet speak password variants", () => {
        expect(leetSpeakRule("p4ssw0rd")).toBeTruthy();
        expect(leetSpeakRule("p455w0rd")).toBeTruthy();
    });

    it("detects leet speak hello variants", () => {
        expect(leetSpeakRule("h3ll0")).toBeTruthy();
    });

    it("returns null for normal input", () => {
        expect(leetSpeakRule("Harshit")).toBe(null);
        expect(leetSpeakRule("Mumbai")).toBe(null);
    });

    it("returns null for non-placeholder leet input", () => {
        expect(leetSpeakRule("c0d3r")).toBe(null);
        expect(leetSpeakRule("h4ck3r")).toBe(null);
    });

    it("supports custom words", () => {
        expect(leetSpeakRule("mycust0mw0rd", ["mycustomword"])).toBeTruthy();
    });

    it("returns null for empty input", () => {
        expect(leetSpeakRule("")).toBe(null);
        expect(leetSpeakRule(null)).toBe(null);
    });
    
    it("returns null for whitespace-only input", () => {
        expect(leetSpeakRule("   ")).toBe(null);
    });
});