export type SenseMode = "first" | "all" | "detailed" | "score";

export type InputType = "email" | "fullName" | "pin";

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
  | "leetSpeak"
  | "validEmailFormat"
  | "spaceRequired"
  | "namePartsRule"
  | "pinRule";

export interface RepeatedCharRuleConfig {
  threshold?: number;
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

export interface ValidEmailFormatRuleConfig {
  blockedDomains?: string[];
  allowedDomains?: string[];
}

export interface NamePartsRuleConfig {
  // No config options currently, but reserved for future
}

export interface SpaceRequiredRuleConfig {
  // No config options currently
}

export interface PinRuleConfig {
  minLength?: number;
  maxLength?: number;
  noRepeated?: boolean;
  noSequential?: boolean;
}

export interface RuleConfigs {
  repeatedChar?: RepeatedCharRuleConfig;
  keyboardPattern?: KeyboardPatternRuleConfig;
  repeatedWord?: RepeatedWordRuleConfig;
  lowVowelRatio?: LowVowelRatioRuleConfig;
  placeholderWord?: PlaceholderWordRuleConfig;
  allCaps?: AllCapsRuleConfig;
  unicodeOnly?: UnicodeOnlyRuleConfig;
  leetSpeak?: LeetSpeakRuleConfig;
  validEmailFormat?: ValidEmailFormatRuleConfig;
  namePartsRule?: NamePartsRuleConfig;
  spaceRequired?: SpaceRequiredRuleConfig;
  pinRule?: PinRuleConfig;
  // Existing rules without config remain as any or can be added later
  minLength?: { minLength?: number };
  entropy?: { minLength?: number; minEntropy?: number };
  sequential?: never;
  reverseSequential?: never;
  symbolOnly?: never;
  numericOnly?: never;
}

export interface SenseInputOptions {
  mode?: SenseMode;
  type?: InputType;
  disable?: RuleName[];
  rules?: RuleConfigs;
  priority?: RuleName[];
}

export interface SenseIssue {
  rule: RuleName;
  message: string;
}

export function senseInput(value: string, options?: SenseInputOptions): string | null;
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

export function senseInputBatch(
  fields: Record<string, string>,
  options?: SenseInputOptions
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

export function listRules(): RuleName[];