export const passwordPreset = {
    disable: [
        "lowVowelRatio",
        "symbolOnly",
        "allCaps",
        "unicodeOnly",
        "placeholderWord",
        "leetSpeak"
    ],
    enable: ["passwordStrength"],
    rules: {
        minLength: { minLength: 8 },
        repeatedChar: { threshold: 4 },
        keyboardPattern: { minLength: 4 },
        entropy: { minLength: 8, minEntropy: 2.5 },
        passwordStrength: {
            minLength: 8,
            requireUppercase: true,
            requireLowercase: true,
            requireNumber: true,
            requireSpecial: true,
            checkCommon: true
        }
    }
};