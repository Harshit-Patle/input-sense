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
    expect(result).contain("numbers");
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

  it("detects symbol-only input via senseInput", () => {
    const result = senseInput("-----");
    expect(result).toContain("symbol");
  });

  it("skips symbolOnly rule when disabled", () => {
    const result = senseInput("------", { disable: ["symbolOnly"] });
    expect(result).toContain("diversity");
  });

  it("detects numeric-only input via senseInput", () => {
    const result = senseInput("123456");
    expect(result).toContain("numbers");
  });

  it("skips numericOnly rule when disabled", () => {
    const result = senseInput("123456", { disable: ["numericOnly"] });
    expect(result).not.toContain("numbers");
  });

  it("detects repeated words via senseInput", () => {
    const result = senseInput("test test test");
    expect(result).toContain("repeated words");
  });

  it("skips repeatedWord rule when disabled", () => {
    const result = senseInput("test test test", { disable: ["repeatedWord"] });
    expect(result).not.toContain("repeated words");
  });

  it("detects low vowel ratio via senseInput", () => {
    const result = senseInput("bcdfgh");
    expect(result).toContain("vowel");
  });

  it("respects custom repeatedChar threshold config", () => {
    const result = senseInput("aaaa", {
      disable: ["minLength"],
      rules: { repeatedChar: { threshold: 5 } }
    });
    expect(result).toBe(null);
  });

  it("respects custom repeatedWord maxAllowedRatio config", () => {
    const result = senseInput("hello hey there", {
      disable: ["entropy"],
      rules: { repeatedWord: { maxAllowedRatio: 0.6 } }
    });
    expect(result).toBe(null);
  });

  it("respects custom keyboardPattern minLength config", () => {
    const result = senseInput("qwer", {
      disable: ["minLength"],
      rules: { keyboardPattern: { minLength: 5 } }
    });
    expect(result).toBe(null);
  });

  it("respects custom lowVowelRatio minRatio config", () => {
    const result = senseInput("bcdafg", {
      disable: ["entropy"],
      rules: { lowVowelRatio: { minRatio: 0.1 } }
    });
    expect(result).toBe(null);
  });

  it("respects custom lowVowelRatio minLength config", () => {
    const result = senseInput("bcdf", { rules: { lowVowelRatio: { minLength: 5 } } });
    expect(result).toBe(null);
  });

  // mode: "all" branch coverage
  it("returns all issues including keyboardPattern in all mode", () => {
    const result = senseInput("qwerty", { mode: "all", disable: ["minLength", "entropy"] });
    expect(Array.isArray(result)).toBe(true);
    expect(result.some(r => r.includes("keyboard"))).toBe(true);
  });

  it("returns all issues including entropy in all mode", () => {
    const result = senseInput("aaaabb", { mode: "all", disable: ["repeatedChar"] });
    expect(Array.isArray(result)).toBe(true);
    expect(result.some(r => r.includes("diversity"))).toBe(true);
  });

  it("returns all issues including sequential in all mode", () => {
    const result = senseInput("1234", {
      mode: "all",
      disable: ["numericOnly", "repeatedChar", "symbolOnly", "placeholderWord", "repeatedWord", "minLength"]
    });
    expect(Array.isArray(result)).toBe(true);
    expect(result.some(r => r.includes("sequential"))).toBe(true);
  });

  it("returns all issues including reverseSequential in all mode", () => {
    const result = senseInput("9876", {
      mode: "all",
      disable: ["numericOnly", "repeatedChar", "symbolOnly", "placeholderWord", "repeatedWord", "minLength"]
    });
    expect(Array.isArray(result)).toBe(true);
    expect(result.some(r => r.includes("reverse"))).toBe(true);
  });

  it("returns sequential issue in first mode", () => {
    const result = senseInput("1234", {
      disable: ["numericOnly", "repeatedChar", "symbolOnly", "placeholderWord", "repeatedWord", "minLength"]
    });
    expect(result).toContain("sequential");
  });

  it("returns reverseSequential issue in first mode", () => {
    const result = senseInput("9876", {
      disable: ["numericOnly", "repeatedChar", "symbolOnly", "placeholderWord", "repeatedWord", "minLength"]
    });
    expect(result).toContain("reverse");
  });

  it("returns symbolOnly issue in first mode", () => {
    const result = senseInput("----");
    expect(result).toContain("symbol");
  });

  // warn branch coverage
  it("warns about unknown rule only in non-production", () => {
    const original = process.env.NODE_ENV;
    process.env.NODE_ENV = "development";
    const result = senseInput("aaaa", { disable: ["unknownRule"] });
    expect(result).toBeTruthy();
    process.env.NODE_ENV = original;
  });

  it("covers reverseSequential else return branch directly", () => {
    const result = senseInput("9876", {
      disable: ["numericOnly", "repeatedChar", "symbolOnly", "placeholderWord", "repeatedWord", "minLength", "sequential"]
    });
    expect(result).toContain("reverse");
  });

  it("covers symbolOnly falsy branch in all mode", () => {
    const result = senseInput("hello", {
      mode: "all",
      disable: ["repeatedChar", "placeholderWord", "repeatedWord", "minLength", "sequential", "reverseSequential", "keyboardPattern", "entropy", "lowVowelRatio", "numericOnly"]
    });
    expect(result).toBe(null);
  });
});