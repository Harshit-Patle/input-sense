export function entropyRule(value, minLength = 6, minRatio = 0.5) {

    if (!value) return null;

    const normalized = value.trim();

    if (normalized.length < minLength) return null;

    const uniqueChars = new Set(normalized).size;
    const diversityRatio = uniqueChars / normalized.length;

    if (diversityRatio < minRatio) {
        return "Input has low character diversity and looks non-meaningful";
    }

    return null;
}