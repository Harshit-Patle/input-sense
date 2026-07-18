export const phonePreset = {
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
    enable: ["phoneRule"],
    rules: {
        phoneRule: {
            minDigits: 10,
            maxDigits: 15,
            allowPlus: true,
            allowSpaces: true,
            allowDashes: true,
            allowParens: true,
            noRepeated: false
        }
    }
};