export function phoneRule(value, options = {}) {
    if (!value) return null;

    const {
        minDigits = 10,
        maxDigits = 15,
        allowPlus = true,
        allowSpaces = true,
        allowDashes = true,
        allowParens = true,
        noRepeated = false,
    } = options;

    const normalized = value.trim();
    if (normalized.length === 0) return null;

    // Build allowed characters regex
    let allowedPattern = "\\d";
    if (allowPlus) allowedPattern += "\\+";
    if (allowSpaces) allowedPattern += "\\s";
    if (allowDashes) allowedPattern += "\\-";
    if (allowParens) allowedPattern += "\\(\\)";

    // Check 1: Only allowed characters
    const allowedRegex = new RegExp(`^[${allowedPattern}]+$`);
    if (!allowedRegex.test(normalized)) {
        return "Phone number must contain only numbers and valid separators";
    }

    // Check 2: Count digits only
    const digitsOnly = normalized.replace(/\D/g, "");
    if (digitsOnly.length < minDigits) {
        return `Phone number must contain at least ${minDigits} digits`;
    }
    if (digitsOnly.length > maxDigits) {
        return `Phone number must contain at most ${maxDigits} digits`;
    }

    // Check 3: No repeated digits (optional)
    if (noRepeated) {
        const allSame = digitsOnly.split("").every(d => d === digitsOnly[0]);
        if (allSame) {
            return "Phone number must not contain repeated digits";
        }
    }

    return null;
}