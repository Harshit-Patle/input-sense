export function spaceRequiredRule(value) {
    if (!value) return null;

    const normalized = value.trim();
    if (normalized.length === 0) return null;

    if (!normalized.includes(" ")) {
        return "Please enter your full name (first and last name)";
    }

    return null;
}