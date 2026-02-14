export interface MinLengthRuleConfig {
    minLength?: number;
}

export interface EntropyRuleConfig {
    minLength?: number;
    minRatio?: number;
}

export type RuleName =
    | "repeatedChar"
    | "placeholderWord"
    | "minLength"
    | "sequential"
    | "reverseSequential"
    | "keyboardPattern"
    | "entropy";

export interface RulesConfig {
    minLength?: MinLengthRuleConfig;
    entropy?: EntropyRuleConfig;
}

export interface SenseInputOptions {
    mode?: "first" | "all";
    disable?: RuleName[];
    rules?: RulesConfig;
}

export function senseInput(
    value: string,
    options?: SenseInputOptions
): string | string[] | null;