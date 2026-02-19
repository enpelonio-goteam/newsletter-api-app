const { REQUIRED_TEMPLATES } = require("./constants");

function requiredTemplateKeys() {
  return REQUIRED_TEMPLATES.map((filename) => filename.replace(".html", ""));
}

function loadTemplatesFromObject(templatesObject) {
  if (!templatesObject || typeof templatesObject !== "object") {
    throw new Error("templatesObject must be an object with template strings.");
  }

  const keys = requiredTemplateKeys();
  const missing = keys.filter((key) => !(key in templatesObject));
  if (missing.length > 0) {
    throw new Error(`Missing templates in templatesObject: ${missing.join(", ")}`);
  }

  const templates = {};
  for (const key of keys) {
    const value = templatesObject[key];
    if (typeof value !== "string") {
      throw new Error(`Template "${key}" must be a string.`);
    }
    templates[key] = value;
  }

  return templates;
}

module.exports = {
  loadTemplatesFromObject,
  requiredTemplateKeys,
};
