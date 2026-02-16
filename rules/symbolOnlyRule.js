export function symbolOnlyRule(value) {
    if (!value) return null;

    const normalized = value.trim();
    if (normalized.length === 0){
        return "Input contains only symbols or whitespace";
    }

    const hasAlphaNumeric = /[a-zA-Z0-9]/.test(normalized);
    if (!hasAlphaNumeric) {
        return "Input contains only symbols or whitespace";
    }

    return null;
}