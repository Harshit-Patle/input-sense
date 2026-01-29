export function minLengthRule(value, minLength = 4) {

    if (!value) return null;

    const normalized = value.trim();

    if (normalized.length < minLength) {
        return `Input is too short to be meaningful (minimum ${minLength} characters)`;
    }

    return null;

}