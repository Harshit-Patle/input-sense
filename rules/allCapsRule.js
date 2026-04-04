export function allCapsRule(value, minLength = 4) {
    if (!value) return null;

    const normalized = value.trim();
    if (normalized.length < minLength) return null;

    const lettersOnly = normalized.replace(/[^a-zA-Z]/g, "");
    if (lettersOnly.length === 0) return null;

    const isAllCaps = lettersOnly === lettersOnly.toUpperCase();

    if (isAllCaps) {
        return "Input contains only uppercase letters and looks non-meaningful";
    }

    return null;
}