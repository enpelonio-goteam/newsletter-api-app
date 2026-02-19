const { buildNewsletterHtml } = require("./src/buildNewsletterHtml");
const { normalizeNewsletterInput } = require("./src/normalizeInput");
const { validateNewsletterInput } = require("./src/validateInput");
const {
  createContainerStart,
  createContainerEnd,
  createHeader,
  createDivider,
  createTextBlock,
  createButton,
  createSectionImageHtml,
  createSection,
  createSocialLinksHtml,
  createFooter,
  assembleNewsletter,
} = require("./src/standaloneFunctions");

module.exports = {
  buildNewsletterHtml,
  normalizeNewsletterInput,
  validateNewsletterInput,
  createContainerStart,
  createContainerEnd,
  createHeader,
  createDivider,
  createTextBlock,
  createButton,
  createSectionImageHtml,
  createSection,
  createSocialLinksHtml,
  createFooter,
  assembleNewsletter,
};
