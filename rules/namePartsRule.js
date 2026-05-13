export function namePartsRule(value) {
    if (!value) return null;

    const normalized = value.trim().replace(/\s+/g, " ");
    if (normalized.length === 0) return null;

    if (normalized.length > 100) return "Full name must be 100 characters or less";

    const parts = normalized.split(" ");

    for (const part of parts) {
        const subParts = part.split(/[-'.]/);

        for (let i = 0; i < subParts.length; i++) {
            const subPart = subParts[i];
            if (subPart.length === 0) continue;

            // Allow single letter prefix from apostrophe (O'Brien, D'Angelo)
            if (subPart.length === 1 && subParts.length > 1 && i === 0) continue;

            if (subPart.length < 2) {
                return "Each part of your name must be at least 2 characters";
            }

            if (/[0-9]/.test(subPart)) {
                return "Name parts must contain only letters";
            }

            if (!/\p{L}/u.test(subPart)) {
                return "Name parts must contain only letters";
            }
        }
    }

    return null;
}