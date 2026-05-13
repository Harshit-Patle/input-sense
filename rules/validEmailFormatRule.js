import { placeholderWordRule } from "./placeholderWord.js";

const BLOCKED_DOMAINS = [
    "test.com", "example.com", "domain.com", "email.com", "mail.com",
    "sample.com", "fake.com", "dummy.com", "abc.com", "xyz.com",
    "foo.com", "bar.com", "temp.com", "tempmail.com", "mailinator.com",
    "yopmail.com", "guerrillamail.com", "throwam.com", "trashmail.com",
    "sharklasers.com", "dispostable.com", "10minutemail.com", "throwaway.email",
    "getairmail.com", "fakeinbox.com", "maildrop.cc", "spamgourmet.com",
    "mailnull.com", "trashmail.at", "trashmail.io", "tempr.email",
    "discard.email", "spamcorpse.com"
];

const BLOCKED_LOCAL_PARTS = [
    "noreply", "no-reply", "donotreply", "do-not-reply",
    "postmaster", "webmaster", "mailer-daemon", "bounce",
    "admin", "support", "info", "contact"
];

const EMAIL_LOCAL_PLACEHOLDER_WORDS = [
    "test", "testing", "tester",
    "demo", "sample", "example", "dummy", "placeholder",
    "abc", "xyz", "foo", "bar", "baz", "qux", "foobar",
    "temp", "fake", "null", "none", "undefined", "anon",
    "guest", "anonymous", "tempuser"
];

export function validEmailFormatRule(value, blockedDomains = [], allowedDomains = []) {
    if (!value) return null;

    const normalized = value.trim().toLowerCase();
    if (normalized.length === 0) return null;

    // Check 1 — total length
    if (normalized.length > 254) return "Input does not look like a valid email address";

    // Check 2 — must have exactly one @
    const atCount = (normalized.match(/@/g) || []).length;
    if (atCount !== 1) return "Input does not look like a valid email address";

    const [local, domain] = normalized.split("@");

    // Check 3 — no spaces
    if (normalized.includes(" ")) return "Input does not look like a valid email address";

    // Check 4 — local part checks
    if (!local || local.length < 2) return "Input does not look like a valid email address";
    if (local.length > 64) return "Input does not look like a valid email address";
    if (/^[0-9]+$/.test(local)) return "Input does not look like a valid email address";
    if (local.startsWith(".") || local.endsWith(".")) return "Input does not look like a valid email address";
    if (local.includes("..")) return "Input does not look like a valid email address";

    // Check 5 — domain basic checks
    if (!domain || !domain.includes(".")) return "Input does not look like a valid email address";
    if (domain.startsWith(".") || domain.endsWith(".")) return "Input does not look like a valid email address";
    if (domain.includes("..")) return "Input does not look like a valid email address";

    // Check 6 — domain parts checks (declare before use)
    const domainParts = domain.split(".");
    for (const part of domainParts) {
        if (part.startsWith("-") || part.endsWith("-")) {
            return "Input does not look like a valid email address";
        }
    }

    const tld = domainParts[domainParts.length - 1];
    const domainName = domainParts[domainParts.length - 2];

    if (!tld || tld.length < 2) return "Input does not look like a valid email address";
    if (!domainName || domainName.length < 2) return "Input does not look like a valid email address";
    if (/^[0-9]+$/.test(domainName)) return "Input does not look like a valid email address";

    // Check 7 — digits in domain name (catches gmai1, g00gle etc)
    if (/[0-9]/.test(domainName)) {
        return "Input does not look like a valid email address";
    }

    // Check 8 — allowedDomains whitelist
    if (allowedDomains.length > 0) {
        const isAllowed = allowedDomains.map(d => d.toLowerCase()).includes(domain);
        if (!isAllowed) return "Email domain is not accepted";
    }

    // Check 9 — blocked domains
    const allBlocked = [...BLOCKED_DOMAINS, ...blockedDomains.map(d => d.toLowerCase())];
    if (allBlocked.includes(domain)) return "Email domain looks disposable or fake";

    // Check 10 — blocked local parts
    const baseLocal = local.split("+")[0];
    if (BLOCKED_LOCAL_PARTS.includes(baseLocal)) return "Email local part looks like a system address";

    // Check 11 — placeholder words in local part segments
    const localSegments = baseLocal.split(/[._\-]/);
    for (const segment of localSegments) {
        if (segment.length > 0 && EMAIL_LOCAL_PLACEHOLDER_WORDS.includes(segment)) {
            return "Email local part looks like a placeholder";
        }
    }

    return null;
}