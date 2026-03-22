export function vowelRatioRule(value, minLength = 5, minRatio = 0.2) {
    if (!value) return null;

    const normalized = value.trim().toLowerCase();
    if (normalized.length < minLength) return null;

    const lettersOnly = normalized.replace(/[^a-z]/g, "");
    if (lettersOnly.length === 0) return null;

    const vowelCount = (lettersOnly.match(/[aeiou]/g) || []).length;
    const ratio = vowelCount / lettersOnly.length;

    if (ratio < minRatio) {
        return "Input has very low vowel presence and looks non-meaningful";
    }

    return null;
}