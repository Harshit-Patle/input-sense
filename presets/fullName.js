export const fullNamePreset = {
    disable: [
        "numericOnly",
        "sequential",
        "reverseSequential",
        "entropy",
        "lowVowelRatio",
        "leetSpeak",
        "unicodeOnly"
    ],
    enable: ["spaceRequired", "namePartsRule"],
    rules: {
        minLength: { minLength: 6 }
    }
};