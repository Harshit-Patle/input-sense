export function repeatedCharRule(value, threshold = 0) {
  if (!value) return null;

  const normalized = value.trim();

  if (threshold > 0) {
    const isRepeated = new RegExp(`^([a-zA-Z0-9])\\1{${threshold},}$`).test(normalized);
    if (isRepeated) return "Input looks like repeated characters";
  } else {
    const isRepeated = /^([a-zA-Z0-9])\1+$/.test(normalized);
    if (isRepeated) return "Input looks like repeated characters";
  }

  return null;
}