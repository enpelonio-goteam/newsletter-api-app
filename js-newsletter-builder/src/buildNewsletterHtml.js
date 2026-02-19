const { normalizeNewsletterInput } = require("./normalizeInput");
const { validateNewsletterInput } = require("./validateInput");
const { loadTemplatesFromObject } = require("./templateLoader");
const { asNonEmptyString } = require("./utils");
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
} = require("./standaloneFunctions");

function buildNewsletterHtml(rawInput, options = {}) {
  if (!options.templates) {
    throw new Error(
      "buildNewsletterHtml requires options.templates (template HTML strings)."
    );
  }

  const templates = loadTemplatesFromObject(options.templates);
  const input = normalizeNewsletterInput(rawInput);
  const validationErrors = validateNewsletterInput(input);
  if (validationErrors.length > 0) {
    throw new Error(`Invalid newsletter input: ${validationErrors.join(" ")}`);
  }

  const accentColor = asNonEmptyString(input.brand.accent_color, "#f93549");
  const headerBgColor = asNonEmptyString(input.brand.header_bg_color, accentColor);

  const introductionHtml = asNonEmptyString(input.content.introduction)
    ? [
        createDivider(templates.divider, { accentColor }),
        createTextBlock(templates["text-block"], {
          textContent: input.content.introduction,
          bodyFontFamily: input.brand.body_font_family,
          bodyTextColor: input.brand.body_text_color,
        }),
      ].join("\n")
    : "";

  const sectionHtmlList = input.content.sections.map((section) => {
    const dividerHtml = createDivider(templates.divider, { accentColor });
    const imageHtml = createSectionImageHtml({
      imageUrl: section.image_url,
      imageAlt: section.image_alt,
    });
    const buttonHtml = createButton(templates.button, {
      buttonText: section.button_text,
      buttonLink: section.button_link,
      buttonBgColor: input.brand.button_bg_color,
      buttonTextColor: input.brand.button_text_color,
      bodyFontFamily: input.brand.body_font_family,
    });
    const sectionHtml = createSection(templates.section, {
      sectionTitle: section.title,
      contentText: section.body,
      imageHtml,
      buttonHtml,
      headingFontFamily: input.brand.heading_font_family,
      bodyFontFamily: input.brand.body_font_family,
      accentColor: accentColor,
      bodyTextColor: input.brand.body_text_color,
    });
    return [dividerHtml, sectionHtml].join("\n");
  });

  const footerHtml = [
    createDivider(templates.divider, { accentColor }),
    createFooter(templates.footer, {
      footerClosingText: input.footer.closing_text,
      footerLogoUrl: input.assets.footer_logo_url,
      footerLogoAlt: input.assets.footer_logo_alt,
      footerLogoWidth: input.brand.footer_logo_width,
      socialLinksHtml: createSocialLinksHtml({
        socialLinks: input.footer.social_links,
        accentColor,
      }),
      accentColor,
      headingFontFamily: input.brand.heading_font_family,
      bodyFontFamily: input.brand.body_font_family,
      bodyTextColor: input.brand.body_text_color,
    }),
  ].join("\n");

  return assembleNewsletter({
    containerStartHtml: createContainerStart(templates["container-start"], {
      previewText: input.header.preview_text,
      bodyFontFamily: input.brand.body_font_family,
      emailBackgroundColor: input.brand.email_background_color,
      contentBackgroundColor: input.brand.content_background_color,
    }),
    headerHtml: createHeader(templates.header, {
      headerImageUrl: input.assets.header_logo_url,
      headerImageAlt: input.assets.header_logo_alt,
      headerLogoWidth: input.brand.header_logo_width,
      newsletterTitle: input.header.newsletter_title,
      headerSubtitle: input.header.newsletter_subtitle,
      headingFontFamily: input.brand.heading_font_family,
      headerBgColor,
      headerTitleColor: input.brand.header_title_color,
      headerSubtitleColor: input.brand.header_subtitle_color,
    }),
    introductionHtml,
    sectionHtmlList,
    footerHtml,
    containerEndHtml: createContainerEnd(templates["container-end"]),
  });
}

module.exports = {
  buildNewsletterHtml,
};
