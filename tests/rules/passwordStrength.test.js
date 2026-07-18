import { describe, it, expect } from "vitest";
import { passwordStrengthRule } from "../../rules/passwordStrengthRule.js";

describe("passwordStrengthRule", () => {
    // Valid passwords
    it("returns null for strong password", () => {
        expect(passwordStrengthRule("Harshit@123")).toBe(null);
        expect(passwordStrengthRule("SecurePass#9")).toBe(null);
        expect(passwordStrengthRule("MyDog$Spot2024")).toBe(null);
    });

    // Minimum length
    it("flags password shorter than minLength", () => {
        expect(passwordStrengthRule("H@1")).toBeTruthy();
        expect(passwordStrengthRule("Abc@123")).toBeTruthy();
    });

    // Uppercase
    it("flags password with no uppercase", () => {
        expect(passwordStrengthRule("harshit@123")).toBeTruthy();
    });

    // Lowercase
    it("flags password with no lowercase", () => {
        expect(passwordStrengthRule("HARSHIT@123")).toBeTruthy();
    });

    // Number
    it("flags password with no number", () => {
        expect(passwordStrengthRule("Harshit@")).toBeTruthy();
    });

    // Special character
    it("flags password with no special character", () => {
        expect(passwordStrengthRule("Harshit123")).toBeTruthy();
    });

    // Common password blacklist
    it("flags common passwords", () => {
        expect(passwordStrengthRule("password")).toBeTruthy();
        expect(passwordStrengthRule("password123")).toBeTruthy();
        expect(passwordStrengthRule("admin123")).toBeTruthy();
        expect(passwordStrengthRule("qwerty")).toBeTruthy();
        expect(passwordStrengthRule("letmein")).toBeTruthy();
    });

    it("flags common passwords with mixed case", () => {
        expect(passwordStrengthRule("Password")).toBeTruthy();
        expect(passwordStrengthRule("PASSWORD")).toBeTruthy();
    });

    // Custom options
    it("respects custom minLength option", () => {
        const result = passwordStrengthRule("H@1a", { minLength: 3, requireSpecial: true });
        expect(result).toBe(null);
    });

    it("skips uppercase check when requireUppercase is false", () => {
        const result = passwordStrengthRule("harshit@123", { requireUppercase: false });
        expect(result).toBe(null);
    });

    it("skips lowercase check when requireLowercase is false", () => {
        const result = passwordStrengthRule("HARSHIT@123", { requireLowercase: false });
        expect(result).toBe(null);
    });

    it("skips number check when requireNumber is false", () => {
        const result = passwordStrengthRule("Harshit@", { requireNumber: false });
        expect(result).toBe(null);
    });

    it("skips special check when requireSpecial is false", () => {
        const result = passwordStrengthRule("Harshit123", { requireSpecial: false });
        expect(result).toBe(null);
    });

    it("skips common check when checkCommon is false", () => {
        const result = passwordStrengthRule("Password123!", { checkCommon: false });
        expect(result).toBe(null);
    });

    // Edge cases
    it("returns null for empty input", () => {
        expect(passwordStrengthRule("")).toBe(null);
        expect(passwordStrengthRule(null)).toBe(null);
    });

    it("returns null for whitespace-only input", () => {
        expect(passwordStrengthRule(" ")).toBe(null);
    });
});