const COMMON_PASSWORDS = [
    "password", "password123", "passw0rd", "p@ssw0rd",
    "admin", "admin123", "admin@123",
    "123456", "12345678", "123456789", "12345",
    "qwerty", "qwerty123", "qwertyuiop",
    "letmein", "letmein123",
    "welcome", "welcome123",
    "abc123", "abcd1234",
    "iloveyou", "iloveyou123",
    "dragon", "dragon123",
    "master", "master123",
    "sunshine", "sunshine123",
    "princess", "princess123",
    "football", "football123",
    "monkey", "monkey123",
    "michael", "michael123",
    "jordan", "jordan123",
    "shadow", "shadow123",
    "ashley", "ashley123",
    "buster", "buster123",
    "soccer", "soccer123",
    "test", "test123",
    "demo", "demo123",
    "hello", "hello123",
    "1234", "1234567",
    "111111", "222222", "333333", "444444", "555555", "666666", "777777", "888888", "999999",
    "000000",
    "password1", "password!",
    "changeme", "changeme123",
    "trustno1", "trustnoone",
    "baseball", "baseball123",
    "hockey", "hockey123",
    "jesus", "jesus123",
    "ninja", "ninja123",
    "mustang", "mustang123",
    "access", "access123",
    "diamond", "diamond123",
    "love", "love123"
];

export function passwordStrengthRule(value, options = {}) {
    if (!value) return null;

    const {
        minLength = 8,
        requireUppercase = true,
        requireLowercase = true,
        requireNumber = true,
        requireSpecial = true,
        checkCommon = true,
    } = options;

    const normalized = value.trim();
    if (normalized.length === 0) return null;

    // Check 1: Minimum length
    if (normalized.length < minLength) {
        return `Password must be at least ${minLength} characters`;
    }

    // Check 2: Uppercase
    if (requireUppercase && !/[A-Z]/.test(normalized)) {
        return "Password must contain at least 1 uppercase letter";
    }

    // Check 3: Lowercase
    if (requireLowercase && !/[a-z]/.test(normalized)) {
        return "Password must contain at least 1 lowercase letter";
    }

    // Check 4: Number
    if (requireNumber && !/[0-9]/.test(normalized)) {
        return "Password must contain at least 1 number";
    }

    // Check 5: Special character
    if (requireSpecial && !/[!@#$%^&*()_+\-=\[\]{};:'",.<>?/]/.test(normalized)) {
        return "Password must contain at least 1 special character";
    }

    // Check 6: Common password blacklist
    if (checkCommon && COMMON_PASSWORDS.includes(normalized.toLowerCase())) {
        return "Password is too common and easily guessable";
    }

    return null;
}