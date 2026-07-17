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
    const result = senseInput("valid", { rules: { minLength: { minLength: 6 } } });
    expect(result).toContain("minimum 6");
  });

  it("respects custom entropy rule config", () => {
    const result = senseInput("abcdef", { rules: { entropy: { minLength: 6, minRatio: 0.9 } } });
    expect(result).toBeTruthy();
  });

  it("uses default rule values when no config is provided", () => {
    const result = senseInput("abc", { disable: ["placeholderWord", "leetSpeak"] });
    expect(result).toContain("too short");
  });

  it("returns all issues using custom rule configs in all mode", () => {
    const result = senseInput("abc", { mode: "all", rules: { minLength: { minLength: 5 } } });
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it("detects symbol-only input via senseInput", () => {
    const result = senseInput("-----", { disable: ["unicodeOnly"] });
    expect(result).toContain("symbol");
  });

  it("skips symbolOnly rule when disabled", () => {
    const result = senseInput("------", { disable: ["symbolOnly", "unicodeOnly"] });
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
    const result = senseInput("john john john");
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
    const result = senseInput("john smith here", {
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
    const result = senseInput("----", { disable: ["unicodeOnly"] });
    expect(result).toContain("symbol");
  });

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
      disable: ["repeatedChar", "placeholderWord", "leetSpeak", "repeatedWord", "minLength", "sequential", "reverseSequential", "keyboardPattern", "entropy", "lowVowelRatio", "numericOnly", "allCaps", "unicodeOnly"]
    });
    expect(result).toBe(null);
  });

  it("respects custom placeholderWord customWords config", () => {
    const result = senseInput("mycustomword", {
      rules: { placeholderWord: { customWords: ["mycustomword"] } }
    });
    expect(result).toContain("placeholder");
  });

  it("returns structured object in detailed mode for first issue", () => {
    const result = senseInput("aaaa", { mode: "detailed" });
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty("rule", "repeatedChar");
    expect(result[0]).toHaveProperty("message");
  });

  it("returns all structured objects in detailed mode", () => {
    const result = senseInput("1234", {
      mode: "detailed",
      disable: ["numericOnly", "repeatedChar", "symbolOnly", "placeholderWord", "repeatedWord", "minLength"]
    });
    expect(Array.isArray(result)).toBe(true);
    expect(result.every(i => "rule" in i && "message" in i)).toBe(true);
  });

  it("returns null in detailed mode for valid input", () => {
    const result = senseInput("Harshit", { mode: "detailed" });
    expect(result).toBe(null);
  });

  it("does not break existing first mode behaviour after detailed mode added", () => {
    expect(senseInput("aaaa")).toBe("Input looks like repeated characters");
  });

  it("does not break existing all mode behaviour after detailed mode added", () => {
    const result = senseInput("aaaa", { mode: "all" });
    expect(result).toEqual(["Input looks like repeated characters"]);
  });

  it("detects all caps input via senseInput", () => {
    const result = senseInput("HELLO", { disable: ["minLength"] });
    expect(result).toContain("uppercase");
  });

  it("skips allCaps rule when disabled", () => {
    const result = senseInput("HARSHIT", { disable: ["allCaps", "minLength"] });
    expect(result).toBe(null);
  });

  it("respects custom allCaps minLength config", () => {
    const result = senseInput("AB", {
      disable: ["minLength"],
      rules: { allCaps: { minLength: 3 } }
    });
    expect(result).toBe(null);
  });

  it("detects unicode-only input via senseInput", () => {
    const result = senseInput("🔥🔥🔥");
    expect(result).toContain("standard characters");
  });

  it("skips unicodeOnly rule when disabled", () => {
    const result = senseInput("🔥🔥🔥", { disable: ["unicodeOnly"] });
    expect(result).not.toContain("standard characters");
  });

  it("respects custom unicodeOnly minLength config", () => {
    const result = senseInput("🔥", {
      disable: ["symbolOnly", "minLength"],
      rules: { unicodeOnly: { minLength: 3 } }
    });
    expect(result).toBe(null);
  });

  it("detects leet speak input via senseInput", () => {
    const result = senseInput("4dmin", { disable: ["minLength"] });
    expect(result).toContain("leet");
  });

  it("skips leetSpeak rule when disabled", () => {
    const result = senseInput("4dmin", { disable: ["leetSpeak", "minLength"] });
    expect(result).toBe(null);
  });

  it("respects custom leetSpeak customWords config", () => {
    const result = senseInput("mycust0mw0rd", {
      rules: { leetSpeak: { customWords: ["mycustomword"] } }
    });
    expect(result).toContain("leet");
  });

  it("returns 100 for valid input in score mode", () => {
    const result = senseInput("Harshit", { mode: "score" });
    expect(result).toBe(100);
  });

  it("returns 0 for repeated char input in score mode", () => {
    const result = senseInput("aaaa", { mode: "score" });
    expect(result).toBe(0);
  });

  it("returns a number between 0 and 100 in score mode", () => {
    const result = senseInput("HARSHIT", {
      mode: "score",
      disable: ["minLength"]
    });
    expect(typeof result).toBe("number");
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(100);
  });

  it("returns lower score for worse input in score mode", () => {
    const good = senseInput("Harshit", { mode: "score" });
    const bad = senseInput("qwerty", {
      mode: "score",
      disable: ["minLength", "placeholderWord", "leetSpeak"]
    });
    expect(bad).toBeLessThan(good);
  });

  it("does not break existing modes after score mode added", () => {
    expect(senseInput("aaaa")).toBe("Input looks like repeated characters");
    expect(senseInput("aaaa", { mode: "all" })).toEqual(["Input looks like repeated characters"]);
  });

  it("runs minLength before repeatedChar when priority is set", () => {
    const result = senseInput("aaaa", {
      priority: ["minLength", "repeatedChar"],
      disable: ["placeholderWord", "leetSpeak", "allCaps", "unicodeOnly",
        "symbolOnly", "numericOnly", "repeatedWord"],
      rules: { minLength: { minLength: 5 } }
    });
    expect(result).toContain("too short");
  });

  it("ignores unknown rule names in priority safely", () => {
    const result = senseInput("aaaa", { priority: ["notARealRule"] });
    expect(result).toBeTruthy();
  });

  it("works with priority in mode all", () => {
    const result = senseInput("aaaa", {
      mode: "all",
      priority: ["minLength", "repeatedChar"],
      disable: ["placeholderWord", "leetSpeak", "allCaps", "unicodeOnly",
        "symbolOnly", "numericOnly", "repeatedWord"],
      rules: { minLength: { minLength: 5 } }
    });
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toContain("too short");
  });

  // email type preset tests
  it("detects invalid email format via type email", () => {
    const result = senseInput("notanemail", { type: "email" });
    expect(result).toContain("valid email");
  });

  it("detects disposable email domain via type email", () => {
    const result = senseInput("user@mailinator.com", { type: "email" });
    expect(result).toContain("disposable");
  });
  
  it("detects keyboard pattern in email via type email", () => {
    const result = senseInput("qwerty@gmail.com", { type: "email" });
    expect(result).toContain("keyboard");
  });

  it("returns null for valid email via type email", () => {
    const result = senseInput("harshit@gmail.com", { type: "email" });
    expect(result).toBe(null);
  });

  it("respects allowedDomains config via type email", () => {
    const result = senseInput("user@gmail.com", {
      type: "email",
      rules: { validEmailFormat: { allowedDomains: ["company.com"] } }
    });
    expect(result).toContain("not accepted");
  });

  it("respects custom blockedDomains config via type email", () => {
    const result = senseInput("user@competitor.com", {
      type: "email",
      rules: { validEmailFormat: { blockedDomains: ["competitor.com"] } }
    });
    expect(result).toContain("disposable");
  });

  // fullName type preset tests
  it("flags single word name via type fullName", () => {
    const result = senseInput("HarshitPatle", { type: "fullName" });
    expect(result).toBeTruthy();
  });

  it("flags missing space in full name via type fullName", () => {
    const result = senseInput("JohnSmith", { type: "fullName" });
    expect(result).toContain("full name");
  });

  it("flags all caps full name via type fullName", () => {
    const result = senseInput("HARSHIT PATLE", { type: "fullName" });
    expect(result).toContain("uppercase");
  });

  it("flags repeated words in full name via type fullName", () => {
    const result = senseInput("aaaa aaaa", { type: "fullName" });
    expect(result).toContain("repeated words");
  });

  it("returns null for valid full name via type fullName", () => {
    const result = senseInput("Harshit Patle", { type: "fullName" });
    expect(result).toBe(null);
  });

  it("allows disabling spaceRequired for mononyms", () => {
    const result = senseInput("Beyonce", {
      type: "fullName",
      disable: ["spaceRequired", "minLength"]
    });
    expect(result).toBe(null);
  });

  it("flags placeholder word in full name via type fullName", () => {
    const result = senseInput("test user", { type: "fullName" });
    expect(result).toContain("placeholder");
  });

  it("flags numeric part in full name via type fullName", () => {
    const result = senseInput("John 123", { type: "fullName" });
    expect(result).toContain("letters");
  });

  it("flags single letter part in full name via type fullName", () => {
    const result = senseInput("J Smith", { type: "fullName" });
    expect(result).toContain("2 characters");
  });

  it("returns null for hyphenated name via type fullName", () => {
    const result = senseInput("Mary-Jane Watson", { type: "fullName" });
    expect(result).toBe(null);
  });

  it("returns null for name with apostrophe via type fullName", () => {
    const result = senseInput("O'Brien Connor", { type: "fullName" });
    expect(result).toBe(null);
  });
});

// PIN preset tests
it("detects invalid PIN format via type pin", () => {
  const result = senseInput("123", { type: "pin" });
  expect(result).toContain("PIN must be at least 4 digits");
});

it("detects repeated PIN digits via type pin", () => {
  const result = senseInput("1111", { type: "pin" });
  expect(result).toContain("PIN must not contain repeated digits");
});

it("detects sequential PIN digits via type pin", () => {
  const result = senseInput("1234", { type: "pin" });
  expect(result).toContain("PIN must not contain sequential digits");
});

it("returns null for valid PIN via type pin", () => {
  const result = senseInput("1478", { type: "pin" });
  expect(result).toBe(null);
});

it("allows 6-digit PIN via type pin", () => {
  const result = senseInput("147258", { type: "pin" });
  expect(result).toBe(null);
});

it("respects custom pinRule config via type pin", () => {
  const result = senseInput("1111", {
    type: "pin",
    rules: { pinRule: { noRepeated: false } }
  });
  expect(result).toBe(null);
});