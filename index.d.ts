export type SenseMode = "first" | "all";

export type RuleName =
    | "repeatedChar"
    | "placeholderWord"
    | "minLength"
    | "sequential"
    | "reverseSequential"
    | "keyboardPattern"
    | "entropy"
    | "symbolOnly"
    | "numericOnly";

export interface MinLengthRuleConfig {
    minLength?: number;
}

export interface EntropyRuleConfig {
    minLength?: number;
    minRatio?: number;
}

export interface RuleConfigs {
    minLength?: MinLengthRuleConfig;
    entropy?: EntropyRuleConfig;
}

export interface SenseInputOptions {
    mode?: SenseMode;
    disable?: RuleName[];
    rules?: RuleConfigs;
}

export function senseInput(
    value: string,
    options?: SenseInputOptions
): string | string[] | null;