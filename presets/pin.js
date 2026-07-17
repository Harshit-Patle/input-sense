export const pinPreset = {
    disable: [
        "repeatedChar",
        "placeholderWord",
        "minLength",
        "sequential",
        "reverseSequential",
        "keyboardPattern",
        "entropy",
        "symbolOnly",
        "numericOnly",
        "repeatedWord",
        "lowVowelRatio",
        "allCaps",
        "unicodeOnly",
        "leetSpeak"
    ],
    enable: ["pinRule"],
    rules: {
        pinRule: {
            minLength: 4,
            maxLength: 6,
            noRepeated: true,
            noSequential: false
        }
    }
};