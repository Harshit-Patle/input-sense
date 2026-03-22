export function repeatedWordRule(value) {
    if (!value) return null;

    const normalized = value.trim().toLowerCase();
    if (normalized.length === 0) return null;

    const words = normalized.split(/\s+/);

    // Only meaningful if multiple words
    if (words.length < 2) return null;

    const uniqueWords = new Set(words);

    if (uniqueWords.size === 1) {
        return "Input contains repeated words and looks non-meaningful";
    }

    return null;
}