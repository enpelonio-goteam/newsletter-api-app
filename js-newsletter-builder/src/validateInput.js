function validateNewsletterInput(input) {
  const errors = [];

  if (!input || typeof input !== "object") {
    return ["Input must be a JSON object."];
  }

  if (!input.brand || typeof input.brand !== "object") {
    errors.push("Missing brand object.");
  }

  if (!input.assets || typeof input.assets !== "object") {
    errors.push("Missing assets object.");
  }

  if (!input.header || typeof input.header !== "object") {
    errors.push("Missing header object.");
  }

  if (!input.content || typeof input.content !== "object") {
    errors.push("Missing content object.");
  }

  if (!Array.isArray(input.content?.sections)) {
    errors.push("content.sections must be an array.");
  }

  if (!input.footer || typeof input.footer !== "object") {
    errors.push("Missing footer object.");
  }

  if (input.footer && !Array.isArray(input.footer.social_links)) {
    errors.push("footer.social_links must be an array.");
  }

  return errors;
}

module.exports = {
  validateNewsletterInput,
};
