import { describe, it, expect } from "vitest";
import { minLengthRule } from "../../rules/minLength";

describe("minLengthRule", () => {
  it("detects input shorter than minimum length", () => {
    const result = minLengthRule("a");
    expect(result).toBeTruthy();
  });

  it("returns null for input meeting minimum length", () => {
    const result = minLengthRule("abcd");
    expect(result).toBe(null);
  });

  it("returns null for empty input", () => {
    expect(minLengthRule("")).toBe(null);
    expect(minLengthRule(null)).toBe(null);
  });
});
