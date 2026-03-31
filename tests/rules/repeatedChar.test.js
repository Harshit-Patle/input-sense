import { describe, it, expect } from "vitest";
import { repeatedCharRule } from "../../rules/repeatedChar";

describe("repeatedCharRule", () => {
  it("detects repeated characters", () => {
    const result = repeatedCharRule("aaaa");
    expect(result).toBeTruthy();
  });

  it("returns null for normal input", () => {
    const result = repeatedCharRule("abcd");
    expect(result).toBe(null);
  });

  it("allows input when repetitions are under custom threshold", () => {
    const result = repeatedCharRule("aaa", 4);
    expect(result).toBe(null);
  });

  it("flags input when repetitions meet custom threshold", () => {
    const result = repeatedCharRule("aaaaa", 4);
    expect(result).toBeTruthy();
  });

  it("uses default behaviour when no threshold is provided", () => {
    const result = repeatedCharRule("aaaa");
    expect(result).toBeTruthy();
  });

  it("returns null for empty input", () => {
    expect(repeatedCharRule("")).toBe(null);
    expect(repeatedCharRule(null)).toBe(null);
  });
});
