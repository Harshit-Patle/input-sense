export function repeatedWordRule(value, maxAllowedRatio = 0) {
    if (!value) return null;

    const normalized = value.trim().toLowerCase();
    if (normalized.length === 0) return null;

    const words = normalized.split(/\s+/);
    if (words.length < 2) return null;

    const uniqueWords = new Set(words);
    const duplicationRatio = 1 - uniqueWords.size / words.length;

    if (duplicationRatio > maxAllowedRatio) {
        return "Input contains repeated words and looks non-meaningful";
    }

    return null;
}