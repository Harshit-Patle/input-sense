import { describe, it, expect } from "vitest";
import { validEmailFormatRule } from "../../rules/validEmailFormatRule.js";

describe("validEmailFormatRule", () => {
    it("returns null for valid email", () => {
        expect(validEmailFormatRule("harshit@gmail.com")).toBe(null);
        expect(validEmailFormatRule("user.name@company.co.in")).toBe(null);
        expect(validEmailFormatRule("123user@domain.org")).toBe(null);
    });

    it("flags missing @ symbol", () => {
        expect(validEmailFormatRule("notanemail")).toBeTruthy();
        expect(validEmailFormatRule("noatsign.com")).toBeTruthy();
    });

    it("flags multiple @ symbols", () => {
        expect(validEmailFormatRule("a@@b.com")).toBeTruthy();
    });

    it("flags missing local part", () => {
        expect(validEmailFormatRule("@gmail.com")).toBeTruthy();
    });

    it("flags missing dot in domain", () => {
        expect(validEmailFormatRule("user@domaincom")).toBeTruthy();
    });

    it("flags TLD shorter than 2 chars", () => {
        expect(validEmailFormatRule("user@domain.c")).toBeTruthy();
    });

    it("flags domain name shorter than 2 chars", () => {
        expect(validEmailFormatRule("user@a.com")).toBeTruthy();
    });

    it("flags spaces in email", () => {
        expect(validEmailFormatRule("user @gmail.com")).toBeTruthy();
    });

    it("flags built-in blocked domains", () => {
        expect(validEmailFormatRule("user@mailinator.com")).toBeTruthy();
        expect(validEmailFormatRule("user@tempmail.com")).toBeTruthy();
        expect(validEmailFormatRule("user@test.com")).toBeTruthy();
    });

    it("flags custom blocked domains", () => {
        expect(validEmailFormatRule("user@blocked.com", ["blocked.com"])).toBeTruthy();
    });

    it("allows email when domain is in allowedDomains", () => {
        expect(validEmailFormatRule("user@company.com", [], ["company.com"])).toBe(null);
    });

    it("flags email when domain is not in allowedDomains", () => {
        expect(validEmailFormatRule("user@gmail.com", [], ["company.com"])).toBeTruthy();
    });

    it("returns null for whitespace-only input", () => {
        expect(validEmailFormatRule("   ")).toBe(null);
    });
});