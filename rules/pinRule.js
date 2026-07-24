const COMMON_PINS = [
    // Simple repeated numbers
    "1111", "2222", "3333", "4444", "5555", "6666", "7777", "8888", "9999", "0000",
    // Sequential
    "1234", "2345", "3456", "4567", "5678", "6789", "7890",
    "9876", "8765", "7654", "6543", "5432", "4321", "3210",
    // Common patterns
    "111111", "222222", "333333", "444444", "555555", "666666", "777777", "888888", "999999", "000000",
    "123456", "234567", "345678", "456789", "567890",
    "654321", "765432", "876543", "987654",
    // Repeated pairs
    "1212", "2323", "3434", "4545", "5656", "6767", "7878", "8989", "9090",
    "1122", "1133", "1144", "1155", "1166", "1177", "1188", "1199",
    // Common keyboard patterns
    "2580", "1478", "3690", "1590", "9510",
    // Other common PINs
    "123123", "321321", "1010", "2020", "3030", "4040", "5050", "6060", "7070", "8080", "9090",
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