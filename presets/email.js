export const emailPreset = {
    disable: [
        "repeatedChar",
        "sequential",
        "reverseSequential",
        "numericOnly",
        "lowVowelRatio",
        "allCaps",
        "unicodeOnly",
        "repeatedWord",
        "entropy"
    ],
    enable: ["validEmailFormat"],
    rules: {
        minLength: { minLength: 6 }
    }
};