const { DEFAULTS } = require("./constants");
const { asNonEmptyString, asPositiveIntString } = require("./utils");

function normalizeSection(section, index) {
  return {
    section_number: asNonEmptyString(section?.section_number, String(index + 1)),
    title: asNonEmptyString(section?.title),
    body: asNonEmptyString(section?.body || section?.body_html || section?.content),
    image_url: asNonEmptyString(section?.image_url),
    image_alt: asNonEmptyString(section?.image_alt),
    button_text: asNonEmptyString(section?.button_text),
    button_link: asNonEmptyString(section?.button_link),
  };
}

function normalizeSocialLink(link) {
  return {
    label: asNonEmptyString(link?.label),
    url: asNonEmptyString(link?.url),
    icon_url: asNonEmptyString(link?.icon_url),
  };
}

function normalizeNewsletterInput(rawInput = {}) {
  const brand = rawInput.brand || {};
  const assets = rawInput.assets || {};
  const header = rawInput.header || {};
  const content = rawInput.content || {};
  const footer = rawInput.footer || {};
  const issue = rawInput.issue || {};
  const workflowContext = rawInput.workflow_context || {};

  const normalizedBrand = {
    brand_name: asNonEmptyString(brand.brand_name),
    heading_font_family: asNonEmptyString(
      brand.heading_font_family,
      DEFAULTS.heading_font_family
    ),
    body_font_family: asNonEmptyString(
      brand.body_font_family,
      DEFAULTS.body_font_family
    ),
    accent_color: asNonEmptyString(brand.accent_color, DEFAULTS.accent_color),
    header_bg_color: asNonEmptyString(brand.header_bg_color, DEFAULTS.header_bg_color),
    header_title_color: asNonEmptyString(
      brand.header_title_color,
      DEFAULTS.header_title_color
    ),
    header_subtitle_color: asNonEmptyString(
      brand.header_subtitle_color,
      DEFAULTS.header_subtitle_color
    ),
    body_text_color: asNonEmptyString(brand.body_text_color, DEFAULTS.body_text_color),
    button_bg_color: asNonEmptyString(brand.button_bg_color, DEFAULTS.button_bg_color),
    button_text_color: asNonEmptyString(
      brand.button_text_color,
      DEFAULTS.button_text_color
    ),
    email_background_color: asNonEmptyString(
      brand.email_background_color,
      DEFAULTS.email_background_color
    ),
    content_background_color: asNonEmptyString(
      brand.content_background_color,
      DEFAULTS.content_background_color
    ),
    header_logo_width: asPositiveIntString(
      brand.header_logo_width,
      DEFAULTS.header_logo_width
    ),
    footer_logo_width: asPositiveIntString(
      brand.footer_logo_width,
      DEFAULTS.footer_logo_width
    ),
  };

  return {
    issue: {
      issue_title: asNonEmptyString(issue.issue_title),
      campaign_purpose: asNonEmptyString(issue.campaign_purpose),
      target_audience: asNonEmptyString(issue.target_audience),
      primary_cta_goal: asNonEmptyString(issue.primary_cta_goal),
      style_direction: asNonEmptyString(issue.style_direction),
      template_name: asNonEmptyString(issue.template_name),
    },
    brand: normalizedBrand,
    assets: {
      header_logo_url: asNonEmptyString(assets.header_logo_url || assets.header_image_url),
      header_logo_alt: asNonEmptyString(assets.header_logo_alt || assets.header_image_alt),
      footer_logo_url: asNonEmptyString(assets.footer_logo_url),
      footer_logo_alt: asNonEmptyString(assets.footer_logo_alt),
    },
    header: {
      newsletter_title: asNonEmptyString(header.newsletter_title || header.title),
      newsletter_subtitle: asNonEmptyString(header.newsletter_subtitle || header.subtitle),
      preview_text: asNonEmptyString(header.preview_text || rawInput.preview_text),
    },
    content: {
      introduction: asNonEmptyString(
        content.introduction || content.introduction_html || rawInput.introduction
      ),
      sections: Array.isArray(content.sections)
        ? content.sections.map(normalizeSection)
        : Array.isArray(rawInput.sections)
          ? rawInput.sections.map(normalizeSection)
          : [],
    },
    footer: {
      closing_text: asNonEmptyString(footer.closing_text),
      social_links: Array.isArray(footer.social_links)
        ? footer.social_links.map(normalizeSocialLink)
        : [],
    },
    workflow_context: {
      tone: asNonEmptyString(workflowContext.tone),
      constraints: asNonEmptyString(workflowContext.constraints),
      notes: asNonEmptyString(workflowContext.notes),
      references: asNonEmptyString(workflowContext.references),
    },
  };
}

module.exports = {
  normalizeNewsletterInput,
};
