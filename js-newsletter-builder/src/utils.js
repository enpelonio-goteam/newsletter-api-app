function asString(value) {
  if (value === null || value === undefined) return "";
  return String(value);
}

function asNonEmptyString(value, fallback = "") {
  const normalized = asString(value).trim();
  return normalized || fallback;
}

function asPositiveIntString(value, fallback) {
  const parsed = parseInt(asString(value), 10);
  if (Number.isFinite(parsed) && parsed > 0) return String(parsed);
  return String(fallback);
}

function replacePlaceholders(template, values) {
  let result = template;
  for (const [key, value] of Object.entries(values)) {
    const placeholder = new RegExp(`\\{\\{${key}\\}\\}`, "g");
    result = result.replace(placeholder, asString(value));
  }

  result = result.replace(/\{\{[A-Z0-9_]+\}\}/g, "");
  return result;
}

function normalizeTypography(value) {
  const input = asString(value);
  if (!input) return input;

  return input
    .replace(/â€™/g, "'")
    .replace(/â€˜/g, "'")
    .replace(/â€œ/g, '"')
    .replace(/â€\u009d/g, '"')
    .replace(/â€”/g, "-")
    .replace(/â€“/g, "-")
    .replace(/â€¦/g, "...")
    .replace(/\u2019/g, "'")
    .replace(/\u2018/g, "'")
    .replace(/\u201c/g, '"')
    .replace(/\u201d/g, '"')
    .replace(/\u2014/g, "-")
    .replace(/\u2013/g, "-")
    .replace(/\u2026/g, "...");
}

module.exports = {
  asString,
  asNonEmptyString,
  asPositiveIntString,
  replacePlaceholders,
  normalizeTypography,
};
