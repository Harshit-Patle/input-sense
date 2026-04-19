export type SenseMode = "first" | "all" | "detailed" | "score";

export type RuleName =
  | "repeatedChar"
  | "placeholderWord"
  | "minLength"
  | "sequential"
  | "reverseSequential"
  | "keyboardPattern"
  | "entropy"
  | "symbolOnly"
  | "numericOnly"
  | "repeatedWord"
  | "lowVowelRatio"
  | "allCaps"
  | "unicodeOnly"
  | "leetSpeak";

// Per-rule config interfaces
export interface RepeatedCharRuleConfig {
  threshold?: number;
}

export interface MinLengthRuleConfig {
  minLength?: number;
}

export interface EntropyRuleConfig {
  minLength?: number;
  minRatio?: number;
}

export interface KeyboardPatternRuleConfig {
  minLength?: number;
}

export interface RepeatedWordRuleConfig {
  maxAllowedRatio?: number;
}

export interface LowVowelRatioRuleConfig {
  minLength?: number;
  minRatio?: number;
}

export interface PlaceholderWordRuleConfig {
  customWords?: string[];
}

export interface AllCapsRuleConfig {
  minLength?: number;
}

export interface UnicodeOnlyRuleConfig {
  minLength?: number;
}

export interface LeetSpeakRuleConfig {
  customWords?: string[];
}

export interface RuleConfigs {
  repeatedChar?: RepeatedCharRuleConfig;
  placeholderWord?: PlaceholderWordRuleConfig;
  minLength?: MinLengthRuleConfig;
  keyboardPattern?: KeyboardPatternRuleConfig;
  entropy?: EntropyRuleConfig;
  repeatedWord?: RepeatedWordRuleConfig;
  lowVowelRatio?: LowVowelRatioRuleConfig;
  allCaps?: AllCapsRuleConfig;
  unicodeOnly?: UnicodeOnlyRuleConfig;
  leetSpeak?: LeetSpeakRuleConfig;
}

export interface SenseInputOptions {
  mode?: SenseMode;
  disable?: RuleName[];
  rules?: RuleConfigs;
  priority?: RuleName[];
}

// Structured result returned by mode: "detailed"
export interface SenseIssue {
  rule: RuleName;
  message: string;
}

// senseInput return type varies by mode:
// mode: "first" (default) → string | null
// mode: "all"             → string[] | null
// mode: "detailed"        → SenseIssue[] | null
// mode: "score"           → number
export function senseInput(
  value: string,
  options?: SenseInputOptions & { mode?: "first" }
): string | null;

export function senseInput(
  value: string,
  options: SenseInputOptions & { mode: "all" }
): string[] | null;

export function senseInput(
  value: string,
  options: SenseInputOptions & { mode: "detailed" }
): SenseIssue[] | null;

export function senseInput(
  value: string,
  options: SenseInputOptions & { mode: "score" }
): number;

// senseInputBatch validates multiple fields at once
// returns a map of field name → same return type as senseInput
export function senseInputBatch(
  fields: Record<string, string>,
  options?: SenseInputOptions & { mode?: "first" }
): Record<string, string | null>;

export function senseInputBatch(
  fields: Record<string, string>,
  options: SenseInputOptions & { mode: "all" }
): Record<string, string[] | null>;

export function senseInputBatch(
  fields: Record<string, string>,
  options: SenseInputOptions & { mode: "detailed" }
): Record<string, SenseIssue[] | null>;

export function senseInputBatch(
  fields: Record<string, string>,
  options: SenseInputOptions & { mode: "score" }
): Record<string, number>;

// listRules returns all available rule names in execution order
export function listRules(): RuleName[];