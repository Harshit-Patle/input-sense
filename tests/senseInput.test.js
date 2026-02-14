import { describe, it, expect } from "vitest";
import { senseInput } from "../index.js";

describe("senseInput", () => {
  it("returns null for valid input", () => {
    const result = senseInput("Harshit");
    expect(result).toBe(null);
  });

  it("skip repeatedChar rule when disabled", () => {
    const result = senseInput("aaaa", { disable: ["repeatedChar"] });
    expect(result).toBe(null);
  });

  it("skip multiple rules when disabled", () => {
    const result = senseInput("1234", { disable: ["sequential", "reverseSequential"] });
    expect(result).toBe(null);
  });

  it("returns null when all rules are disabled", () => {
    const result = senseInput("aaaa", { disable: ["repeatedChar", "placeholderWord", "minLength", "sequential", "reverseSequential", "keyboardPattern", "entropy"] });
    expect(result).toBe(null);
  });

  it("ignores unknown disabled rules safely", () => {
    const result = senseInput("aaaa", { disable: ["notARealRule"] });
    expect(result).toBeTruthy();
  });

  it("does not include disabled rules in all mode", () => {
    const result = senseInput("aaaa", { mode: "all", disable: ["repeatedChar"] });
    expect(result).toBe(null);
  });

  it("returns issues array in all mode when rules are enabled", () => {
    const result = senseInput("aaaa", { mode: "all" });
    expect(result).toEqual(["Input looks like repeated characters"]);
  });

  it("respects custom minLength rule config", () => {
    const result = senseInput("hello", { rules: { minLength: { minLength: 6 } } });
    expect(result).toContain("minimum 6");
  });

  it("respects custom entropy rule config", () => {
    const result = senseInput("abcdef", { rules: { entropy: { minLength: 6, minRatio: 0.9 } } });
    expect(result).toBeTruthy();
  });

  it("uses default rule values when no config is provided", () => {
    const result = senseInput("abc", { disable: ["placeholderWord"] });
    expect(result).toContain("too short");
  });

  it("returns all issues using custom rule configs in all mode", () => {
    const result = senseInput("abc", { mode: "all", rules: { minLength: { minLength: 5 } } });
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });
});
