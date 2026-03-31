import { describe, it, expect } from "vitest";
import { entropyRule } from "../../rules/entropyRule.js";

describe("entropyRule", () => {
  it("detects low-entropy input", () => {
    const result = entropyRule("aaaabb");
    expect(result).toBeTruthy();
  });

  it("returns null for diverse input", () => {
    const result = entropyRule("a1b2c3");
    expect(result).toBe(null);
  });

  it("returns null for empty input", () => {
    expect(entropyRule("")).toBe(null);
    expect(entropyRule(null)).toBe(null);
  });
});
