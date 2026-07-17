import { describe, it, expect } from "vitest";
import { listRules } from "../index.js";

describe("listRules", () => {
    it("returns an array", () => {
        expect(Array.isArray(listRules())).toBe(true);
    });

    it("returns all rules including pinRule", () => {
        const rules = listRules();
        expect(rules.length).toBe(18);
        expect(rules).toContain("pinRule");
    });

    it("contains all expected rule names", () => {
        const rules = listRules();
        expect(rules).toContain("spaceRequired");
        expect(rules).toContain("repeatedChar");
        expect(rules).toContain("allCaps");
        expect(rules).toContain("unicodeOnly");
        expect(rules).toContain("symbolOnly");
        expect(rules).toContain("numericOnly");
        expect(rules).toContain("placeholderWord");
        expect(rules).toContain("leetSpeak");
        expect(rules).toContain("repeatedWord");
        expect(rules).toContain("minLength");
        expect(rules).toContain("sequential");
        expect(rules).toContain("reverseSequential");
        expect(rules).toContain("keyboardPattern");
        expect(rules).toContain("entropy");
        expect(rules).toContain("lowVowelRatio");
        expect(rules).toContain("validEmailFormat");
    });

    it("returns rules in execution order", () => {
        const rules = listRules();
        expect(rules[0]).toBe("spaceRequired");
        expect(rules[rules.length - 1]).toBe("pinRule");
    });

    it("returns a new array on each call", () => {
        const first = listRules();
        const second = listRules();
        expect(first).not.toBe(second);
    });

    it("can be used to validate disable option entries", () => {
        const rules = listRules();
        const userDisable = ["repeatedChar", "entropy"];
        const allValid = userDisable.every(r => rules.includes(r));
        expect(allValid).toBe(true);
    });
});