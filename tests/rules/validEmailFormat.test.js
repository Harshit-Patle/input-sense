import { describe, it, expect } from "vitest";
import { validEmailFormatRule } from "../../rules/validEmailFormatRule.js";

describe("validEmailFormatRule", () => {

    // valid emails
    it("returns null for valid standard email", () => {
        expect(validEmailFormatRule("harshit@gmail.com")).toBe(null);
    });

    it("returns null for email with dots and short TLD", () => {
        expect(validEmailFormatRule("user.name@company.co.in")).toBe(null);
    });

    it("returns null for email starting with numbers", () => {
        expect(validEmailFormatRule("123user@domain.org")).toBe(null);
    });

    it("returns null for email with plus tag", () => {
        expect(validEmailFormatRule("harshit+work@gmail.com")).toBe(null);
    });

    it("returns null for email with underscore", () => {
        expect(validEmailFormatRule("user_name@company.com")).toBe(null);
    });

    it("returns null for email with hyphen in local", () => {
        expect(validEmailFormatRule("user-name@company.com")).toBe(null);
    });

    it("returns null for email with subdomain", () => {
        expect(validEmailFormatRule("harshit@subdomain.company.com")).toBe(null);
    });

    // format failures
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

    it("flags local part shorter than 2 chars", () => {
        expect(validEmailFormatRule("a@gmail.com")).toBeTruthy();
    });

    it("flags local part longer than 64 chars", () => {
        expect(validEmailFormatRule("a".repeat(65) + "@gmail.com")).toBeTruthy();
    });

    it("flags total email longer than 254 chars", () => {
        expect(validEmailFormatRule("a".repeat(250) + "@gmail.com")).toBeTruthy();
    });

    it("flags all-numeric local part", () => {
        expect(validEmailFormatRule("1234@gmail.com")).toBeTruthy();
    });

    it("flags local part starting with dot", () => {
        expect(validEmailFormatRule(".user@gmail.com")).toBeTruthy();
    });

    it("flags local part ending with dot", () => {
        expect(validEmailFormatRule("user.@gmail.com")).toBeTruthy();
    });

    it("flags consecutive dots in local part", () => {
        expect(validEmailFormatRule("user..name@gmail.com")).toBeTruthy();
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

    it("flags numeric domain name", () => {
        expect(validEmailFormatRule("user@123.com")).toBeTruthy();
    });

    it("flags domain starting with hyphen", () => {
        expect(validEmailFormatRule("user@-domain.com")).toBeTruthy();
    });

    it("flags domain ending with hyphen", () => {
        expect(validEmailFormatRule("user@domain-.com")).toBeTruthy();
    });

    it("flags consecutive dots in domain", () => {
        expect(validEmailFormatRule("user@domain..com")).toBeTruthy();
    });

    it("flags domain starting with dot", () => {
        expect(validEmailFormatRule("user@.domain.com")).toBeTruthy();
    });

    it("flags spaces in email", () => {
        expect(validEmailFormatRule("user @gmail.com")).toBeTruthy();
    });

    // blocked domains
    it("flags built-in blocked domains", () => {
        expect(validEmailFormatRule("user@mailinator.com")).toBeTruthy();
        expect(validEmailFormatRule("user@tempmail.com")).toBeTruthy();
        expect(validEmailFormatRule("user@10minutemail.com")).toBeTruthy();
        expect(validEmailFormatRule("user@maildrop.cc")).toBeTruthy();
    });

    it("flags custom blocked domains", () => {
        expect(validEmailFormatRule("user@blocked.com", ["blocked.com"])).toBeTruthy();
    });

    it("allows email when domain is in allowedDomains", () => {
        expect(validEmailFormatRule("harshit@company.com", [], ["company.com"])).toBe(null);
    });

    it("flags email when domain is not in allowedDomains", () => {
        expect(validEmailFormatRule("user@gmail.com", [], ["company.com"])).toBeTruthy();
    });

    // blocked local parts
    it("flags system local parts", () => {
        expect(validEmailFormatRule("noreply@gmail.com")).toBeTruthy();
        expect(validEmailFormatRule("postmaster@gmail.com")).toBeTruthy();
        expect(validEmailFormatRule("support@gmail.com")).toBeTruthy();
        expect(validEmailFormatRule("no-reply@gmail.com")).toBeTruthy();
    });

    // placeholder in local part
    it("flags placeholder word in local part", () => {
        expect(validEmailFormatRule("test@gmail.com")).toBeTruthy();
        expect(validEmailFormatRule("dummy@gmail.com")).toBeTruthy();
    });

    it("flags placeholder in local part segment", () => {
        expect(validEmailFormatRule("test.user@gmail.com")).toBeTruthy();
        expect(validEmailFormatRule("admin_demo@gmail.com")).toBeTruthy();
    });

    it("flags placeholder in plus tag base", () => {
        expect(validEmailFormatRule("test+123@gmail.com")).toBeTruthy();
    });

    it("allows legitimate plus tag", () => {
        expect(validEmailFormatRule("harshit+work@gmail.com")).toBe(null);
    });

    // leet speak in domain
    it("flags leet speak in domain", () => {
        expect(validEmailFormatRule("user@gmai1.com")).toBeTruthy();
    });

    // empty input
    it("returns null for empty input", () => {
        expect(validEmailFormatRule("")).toBe(null);
        expect(validEmailFormatRule(null)).toBe(null);
    });

    it("returns null for whitespace-only input", () => {
        expect(validEmailFormatRule("   ")).toBe(null);
    });

    it("flags emojis in local part", () => {
        expect(validEmailFormatRule("😊@gmail.com")).toBeTruthy();
        expect(validEmailFormatRule("hello😊@gmail.com")).toBeTruthy();
    });

    it("flags TLD longer than 8 chars", () => {
        expect(validEmailFormatRule("user@domain.abcdefghi")).toBeTruthy();
    });
});