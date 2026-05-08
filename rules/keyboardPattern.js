export function keyboardPatternRule(value, minLength = 3) {
  if (!value) return null;

  const normalized = value.trim().toLowerCase();
  if (normalized.length < minLength) return null;

  const keyboardPatterns = [
    "qwertyuiop",
    "asdfghjkl",
    "zxcvbnm",
    "poiuytrewq",
    "lkjhgfdsa",
    "mnbvcxz"
  ];

  // Check the full value first
  for (const pattern of keyboardPatterns) {
    if (pattern.includes(normalized)) {
      return "Input looks like a keyboard pattern";
    }
  }

  // Also check individual segments (split by non-alpha characters)
  const segments = normalized.split(/[^a-z]+/).filter(s => s.length >= minLength);
  for (const segment of segments) {
    for (const pattern of keyboardPatterns) {
      if (pattern.includes(segment)) {
        return "Input looks like a keyboard pattern";
      }
    }
  }

  return null;
}