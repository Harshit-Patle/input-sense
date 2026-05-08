const BLOCKED_DOMAINS = [
    "test.com", "example.com", "domain.com", "email.com", "mail.com",
    "sample.com", "fake.com", "dummy.com", "abc.com", "xyz.com",
    "foo.com", "bar.com", "temp.com", "tempmail.com", "mailinator.com",
    "yopmail.com", "guerrillamail.com", "throwam.com", "trashmail.com",
    "sharklasers.com", "dispostable.com"
];

export function validEmailFormatRule(value, blockedDomains = [], allowedDomains = []) {
    if (!value) return null;

    const normalized = value.trim().toLowerCase();
    if (normalized.length === 0) return null;

    // Check 1 — basic format
    const atCount = (normalized.match(/@/g) || []).length;
    if (atCount !== 1) return "Input does not look like a valid email address";

    const [local, domain] = normalized.split("@");

    if (!local || local.length < 1) return "Input does not look like a valid email address";
    if (!domain || !domain.includes(".")) return "Input does not look like a valid email address";
    if (normalized.includes(" ")) return "Input does not look like a valid email address";

    const domainParts = domain.split(".");
    const tld = domainParts[domainParts.length - 1];
    const domainName = domainParts[domainParts.length - 2];

    if (!tld || tld.length < 2) return "Input does not look like a valid email address";
    if (!domainName || domainName.length < 2) return "Input does not look like a valid email address";

    // Check 2 — allowedDomains (whitelist takes priority)
    if (allowedDomains.length > 0) {
        const isAllowed = allowedDomains.map(d => d.toLowerCase()).includes(domain);
        if (!isAllowed) return "Email domain is not accepted";
    }

    // Check 3 — blocked domains
    const allBlocked = [...BLOCKED_DOMAINS, ...blockedDomains.map(d => d.toLowerCase())];
    if (allBlocked.includes(domain)) return "Email domain looks disposable or fake";

    return null;
}