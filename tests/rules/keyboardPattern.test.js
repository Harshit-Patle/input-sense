import { describe, it, expect } from "vitest";
import { keyboardPatternRule} from "../../rules/keyboardPattern.js"

describe("keyboardPatternRule",()=>{
    it("detects keyboard patterns",()=>{
        const result=keyboardPatternRule("qwerty");
        expect(result).toBeTruthy();
    });
    
    it("returns null for  normal input",()=>{
        const result=keyboardPatternRule("Harshit");
        expect(result).toBe(null);
    });

    it("skips detection when input is under custom minLength", () => {
        const result = keyboardPatternRule("qw", 5);
        expect(result).toBe(null);
    });

    it("flags input when it meets custom minLength and is a keyboard pattern", () => {
        const result = keyboardPatternRule("qwerty", 5);
        expect(result).toBeTruthy();
    });

    it("uses default minLength when no config is provided", () => {
        const result = keyboardPatternRule("qwe");
        expect(result).toBeTruthy();
    });
});