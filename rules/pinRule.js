const COMMON_PINS = [
    "1234", "1111", "0000", "1212", "2580", "5555", "2222", "3333",
    "4444", "7777", "8888", "9999", "4321", "1122", "1221", "2112",
    "123456", "111111", "000000", "123123", "654321", "1010", "2020",
    "112233", "123321", "456789", "789456"
];

export function pinRule(value, options = {}) {
    if (!value) return null;

    const {
        minLength = 4,
        maxLength = 6,
        noRepeated = true,
        noSequential = false
    } = options;

    const normalized = value.trim();
    if (normalized.length === 0) return null;

    // Check 1: Must contain only digits
    if (!/^\d+$/.test(normalized)) {
        return "PIN must contain only numbers";
    }

    // Check 2: Length validation
    if (normalized.length < minLength) {
        return `PIN must be at least ${minLength} digits`;
    }
    if (normalized.length > maxLength) {
        return `PIN must be at most ${maxLength} digits`;
    }

    // Check 3: No repeated digits (e.g., 1111, 2222)
    if (noRepeated) {
        const allSame = normalized.split("").every(d => d === normalized[0]);
        if (allSame) {
            return "PIN must not contain repeated digits";
        }
    }

    // Check 4: No sequential digits (e.g., 1234, 9876)
    if (noSequential) {
        const digits = normalized.split("").map(Number);
        let isSequential = true;
        let isReverseSequential = true;

        for (let i = 1; i < digits.length; i++) {
            if (digits[i] !== digits[i - 1] + 1) isSequential = false;
            if (digits[i] !== digits[i - 1] - 1) isReverseSequential = false;
        }

        if (isSequential || isReverseSequential) {
            return "PIN must not contain sequential digits";
        }
    }

    // Check: Common PIN blacklist
    if (COMMON_PINS.includes(normalized)) {
        return "PIN is too common and easily guessable";
    }

    return null;
}