const LEET_MAP = {
    "4": "a",
    "@": "a",
    "3": "e",
    "1": "i",
    "!": "i",
    "0": "o",
    "5": "s",
    "$": "s",
    "7": "t",
    "+": "t",
    "9": "g",
    "6": "g",
    "8": "b",
    "|": "l",
};

export function leetSpeakRule(value, customWords = []) {
    if (!value) return null;

    const normalized = value.trim().toLowerCase();
    if (normalized.length === 0) return null;

    const decoded = normalized
        .split("")
        .map((char) => LEET_MAP[char] ?? char)
        .join("");

    const PLACEHOLDER_WORDS = [
        "test", "testing", "tester",
        "admin", "administrator", "root", "superuser",
        "user", "username", "guest", "anonymous",
        "demo", "sample", "example", "dummy", "placeholder",
        "abc", "xyz", "foo", "bar", "baz", "foobar",
        "password", "passwd", "pass",
        "login", "letmein",
        "hello", "hey", "hi",
        "null", "none", "undefined",
        ...customWords.map((w) => w.toLowerCase()),
    ];

    if (PLACEHOLDER_WORDS.includes(decoded)) {
        return "Input looks like a leet speak placeholder word";
    }

    return null;
}