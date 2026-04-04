import { describe, it, expect } from "vitest";
import { unicodeOnlyRule } from "../../rules/unicodeOnlyRule.js";

describe("unicodeOnlyRule", () => {
    it("detects emoji-only input", () => {
        expect(unicodeOnlyRule("🔥🔥🔥")).toBeTruthy();
        expect(unicodeOnlyRule("😀😀")).toBeTruthy();
    });

    it("detects non-Latin script only input", () => {
        expect(unicodeOnlyRule("你好你好")).toBeTruthy();
        expect(unicodeOnlyRule("★★★★")).toBeTruthy();
    });

    it("allows input with Latin characters", () => {
        expect(unicodeOnlyRule("Harshit")).toBe(null);
        expect(unicodeOnlyRule("hello")).toBe(null);
    });

    it("allows input with digits", () => {
        expect(unicodeOnlyRule("abc123")).toBe(null);
        expect(unicodeOnlyRule("123")).toBe(null);
    });

    it("allows mixed emoji and Latin input", () => {
        expect(unicodeOnlyRule("hello🔥")).toBe(null);
    });

    it("respects custom minLength config", () => {
        expect(unicodeOnlyRule("🔥", 3)).toBe(null);
        expect(unicodeOnlyRule("🔥🔥🔥", 3)).toBeTruthy();
    });

    it("returns null for whitespace-only input", () => {
        expect(unicodeOnlyRule("   ")).toBe(null);
    });

    it("returns null for empty input", () => {
        expect(unicodeOnlyRule("")).toBe(null);
        expect(unicodeOnlyRule(null)).toBe(null);
    });

    it("returns null for whitespace-only input with custom minLength", () => {
        expect(unicodeOnlyRule("   ", 1)).toBe(null);
    });
});