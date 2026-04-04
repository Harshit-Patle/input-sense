export function unicodeOnlyRule(value, minLength = 1) {
    if (!value) return null;

    const normalized = value.trim();
    if (normalized.length < minLength) return null;
    if (normalized.length === 0) return null;

    const hasLatinOrDigit = /[a-zA-Z0-9]/.test(normalized);

    if (!hasLatinOrDigit) {
        return "Input contains no standard characters and looks non-meaningful";
    }

    return null;
}