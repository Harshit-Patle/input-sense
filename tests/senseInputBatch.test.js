import { describe, it, expect } from "vitest";
import { senseInputBatch } from "../index.js";

describe("senseInputBatch", () => {
    it("returns null for all valid fields", () => {
        const result = senseInputBatch({ username: "Harshit", city: "Mumbai" });
        expect(result.username).toBe(null);
        expect(result.city).toBe(null);
    });

    it("returns issue for invalid field", () => {
        const result = senseInputBatch({ username: "aaaa" });
        expect(result.username).toBeTruthy();
    });

    it("returns mixed results for mixed fields", () => {
        const result = senseInputBatch({ username: "aaaa", city: "Harshit" });
        expect(result.username).toBeTruthy();
        expect(result.city).toBe(null);
    });

    it("passes mode option to all fields", () => {
        const result = senseInputBatch({ username: "aaaa" }, { mode: "all" });
        expect(Array.isArray(result.username)).toBe(true);
    });

    it("passes mode detailed to all fields", () => {
        const result = senseInputBatch({ username: "aaaa" }, { mode: "detailed" });
        expect(Array.isArray(result.username)).toBe(true);
        expect(result.username[0]).toHaveProperty("rule");
        expect(result.username[0]).toHaveProperty("message");
    });

    it("passes disable option to all fields", () => {
        const result = senseInputBatch(
            { username: "aaaa" },
            { disable: ["repeatedChar", "minLength"] }
        );
        expect(result.username).toBe(null);
    });

    it("passes rules config to all fields", () => {
        const result = senseInputBatch(
            { username: "valid" },
            { rules: { minLength: { minLength: 6 } } }
        );
        expect(result.username).toContain("minimum 6");
    });

    it("handles empty object input", () => {
        const result = senseInputBatch({});
        expect(result).toEqual({});
    });

    it("throws TypeError for non-object input", () => {
        expect(() => senseInputBatch("not an object")).toThrow(TypeError);
        expect(() => senseInputBatch(null)).toThrow(TypeError);
        expect(() => senseInputBatch(["aaaa"])).toThrow(TypeError);
    });

    it("returns null for empty string field value", () => {
        const result = senseInputBatch({ username: "" });
        expect(result.username).toBe(null);
    });
});