export function numericOnlyRule(value) {
    if (!value) return null;

    const normalized = value.trim();
    if (normalized.length === 0) return null;

    const isNumericOnly = /^[0-9]+$/.test(normalized);

    if (isNumericOnly) {
        return "Input contains only numbers and looks non-meaningful";
    }

    return null;
}