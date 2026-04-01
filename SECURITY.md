# Security Policy

## Supported Versions

Only the latest version of `input-sense` receives security updates.

| Version | Supported |
|---------|-----------|
| Latest  | ✅ Yes    |
| Older   | ❌ No     |

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please **do not open a public issue**.

Instead, report it privately by emailing the maintainer directly via the contact information on the [GitHub profile](https://github.com/Harshit-Patle).

Please include the following in your report:

- A clear description of the vulnerability
- Steps to reproduce it
- The potential impact
- Any suggested fix if you have one

You can expect an acknowledgement within **72 hours** and a resolution or update within **7 days** depending on severity.

## Scope

This library is a client-side input intent checker with no network calls, no data storage, and no external dependencies. The attack surface is limited, but reports related to the following are still welcome:

- Regex denial of service (ReDoS) in any rule pattern
- Prototype pollution via options or config objects
- Unexpected behaviour that could be exploited in a security-sensitive context

## Out of Scope

- Bugs that do not have a security impact
- Issues in dependencies not directly controlled by this project
