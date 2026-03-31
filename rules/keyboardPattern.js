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

  for (const pattern of keyboardPatterns) {
    if (pattern.includes(normalized)) {
      return "Input looks like a keyboard pattern";
    }
  }

  return null;
}