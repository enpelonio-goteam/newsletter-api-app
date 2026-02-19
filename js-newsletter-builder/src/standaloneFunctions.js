const { replacePlaceholders, asNonEmptyString } = require("./utils");

function createContainerStart(templateHtml, values) {
  return replacePlaceholders(templateHtml, {
    PREVIEW_TEXT: asNonEmptyString(values.previewText),
    BODY_FONT_FAMILY: asNonEmptyString(values.bodyFontFamily),
    EMAIL_BACKGROUND_COLOR: asNonEmptyString(values.emailBackgroundColor),
    CONTENT_BACKGROUND_COLOR: asNonEmptyString(values.contentBackgroundColor),
  });
}

function createContainerEnd(templateHtml) {
  return asNonEmptyString(templateHtml);
}

function createHeader(templateHtml, values) {
  return replacePlaceholders(templateHtml, {
    HEADER_IMAGE_URL: asNonEmptyString(values.headerImageUrl),
    HEADER_IMAGE_ALT: asNonEmptyString(values.headerImageAlt),
    HEADER_LOGO_WIDTH: asNonEmptyString(values.headerLogoWidth),
    NEWSLETTER_TITLE: asNonEmptyString(values.newsletterTitle),
    HEADER_SUBTITLE: asNonEmptyString(values.headerSubtitle),
    HEADING_FONT_FAMILY: asNonEmptyString(values.headingFontFamily),
    HEADER_BG_COLOR: asNonEmptyString(values.headerBgColor),
    HEADER_TITLE_COLOR: asNonEmptyString(values.headerTitleColor),
    HEADER_SUBTITLE_COLOR: asNonEmptyString(values.headerSubtitleColor),
  });
}

function createDivider(templateHtml, values) {
  return replacePlaceholders(templateHtml, {
    ACCENT_COLOR: asNonEmptyString(values.accentColor),
  });
}

function createTextBlock(templateHtml, values) {
  return replacePlaceholders(templateHtml, {
    TEXT_CONTENT: asNonEmptyString(values.textContent),
    BODY_FONT_FAMILY: asNonEmptyString(values.bodyFontFamily),
    BODY_TEXT_COLOR: asNonEmptyString(values.bodyTextColor),
  });
}

function createButton(templateHtml, values) {
  if (!asNonEmptyString(values.buttonText) || !asNonEmptyString(values.buttonLink)) {
    return "";
  }

  return replacePlaceholders(templateHtml, {
    BUTTON_LINK: asNonEmptyString(values.buttonLink),
    BUTTON_TEXT: asNonEmptyString(values.buttonText),
    BUTTON_BG_COLOR: asNonEmptyString(values.buttonBgColor),
    BUTTON_TEXT_COLOR: asNonEmptyString(values.buttonTextColor),
    BODY_FONT_FAMILY: asNonEmptyString(values.bodyFontFamily),
  });
}

function createSectionImageHtml(values) {
  if (!asNonEmptyString(values.imageUrl)) return "";

  return (
    '<tr><td style="font-size:12px;font-family:Arial,Helvetica,sans-serif;font-size:12px;border:0px;padding:0px 0px;border-collapse:collapse" valign="top">' +
    '<table bgcolor="transparent" border="0" cellpadding="0" cellspacing="0" style="font-size:12px;border:0px;padding:0px;width:100%;border-collapse:collapse;word-break:break-word;background-color:transparent"><tbody><tr>' +
    '<td style="border-collapse:collapse;font-size:12px;font-family:Arial,Helvetica,sans-serif;font-size:12px;border:0px;padding:0px 0px;">' +
    '<div style="word-wrap:break-word;overflow:hidden;padding:0px;background-color:transparent">' +
    '<table align="left" border="0" cellpadding="0" cellspacing="0" style="font-size:12px;text-align:left;width:100%;padding:0px;border:0px;border-collapse:collapse;word-break:break-word">' +
    '<tbody><tr><td style="border-collapse:collapse;font-size:12px;font-family:Arial,Helvetica,sans-serif;font-size:12px;border:0px;padding:7px 15px;text-align:center;">' +
    `<img align="left" alt="${asNonEmptyString(values.imageAlt)}" height="auto" hspace="0" size="F" src="${asNonEmptyString(values.imageUrl)}" style="width:570px;height:autopx;max-width:570px!important;border:0px;text-align:left" vspace="0" width="570">` +
    "</td></tr></tbody></table></div></td></tr></tbody></table></td></tr>"
  );
}

function createSection(templateHtml, values) {
  return replacePlaceholders(templateHtml, {
    SECTION_TITLE: asNonEmptyString(values.sectionTitle),
    CONTENT_TEXT: asNonEmptyString(values.contentText),
    IMAGE_HTML: asNonEmptyString(values.imageHtml),
    BUTTON_HTML: asNonEmptyString(values.buttonHtml),
    HEADING_FONT_FAMILY: asNonEmptyString(values.headingFontFamily),
    BODY_FONT_FAMILY: asNonEmptyString(values.bodyFontFamily),
    ACCENT_COLOR: asNonEmptyString(values.accentColor),
    BODY_TEXT_COLOR: asNonEmptyString(values.bodyTextColor),
  });
}

function createSocialLinksHtml(values) {
  const socialLinks = Array.isArray(values.socialLinks) ? values.socialLinks : [];
  const accentColor = asNonEmptyString(values.accentColor);

  return socialLinks
    .map((link) => {
      const label = asNonEmptyString(link.label);
      const url = asNonEmptyString(link.url);
      const iconUrl = asNonEmptyString(link.icon_url);

      if (iconUrl) {
        return (
          `<table border="0" cellpadding="0" cellspacing="0" style="display:inline-table;vertical-align:middle;margin:0 5px;border-collapse:collapse;">` +
          `<tbody><tr><td align="center" valign="middle" style="width:34px;height:34px;border-radius:999px;background-color:${accentColor};padding:0;line-height:0;">` +
          `<a href="${url}" target="_blank" title="${label}" aria-label="${label}" style="display:block;width:34px;height:34px;text-decoration:none;">` +
          `<table border="0" cellpadding="0" cellspacing="0" width="34" height="34" style="width:34px;height:34px;border-collapse:collapse;"><tbody><tr><td align="center" valign="middle" style="padding:0;line-height:0;">` +
          `<img src="${iconUrl}" alt="${label}" width="16" height="16" style="display:inline-block;width:16px;height:16px;vertical-align:middle;border:0;outline:none;text-decoration:none;margin:0 auto;">` +
          `</td></tr></tbody></table></a></td></tr></tbody></table>`
        );
      }

      return `<a href="${url}" target="_blank" style="color:${accentColor};text-decoration:none;margin:0 8px;">${label}</a>`;
    })
    .join("");
}

function createFooter(templateHtml, values) {
  return replacePlaceholders(templateHtml, {
    FOOTER_CLOSING_TEXT: asNonEmptyString(values.footerClosingText),
    FOOTER_LOGO_URL: asNonEmptyString(values.footerLogoUrl),
    FOOTER_LOGO_ALT: asNonEmptyString(values.footerLogoAlt),
    FOOTER_LOGO_WIDTH: asNonEmptyString(values.footerLogoWidth),
    SOCIAL_LINKS_HTML: asNonEmptyString(values.socialLinksHtml),
    ACCENT_COLOR: asNonEmptyString(values.accentColor),
    HEADING_FONT_FAMILY: asNonEmptyString(values.headingFontFamily),
    BODY_FONT_FAMILY: asNonEmptyString(values.bodyFontFamily),
    BODY_TEXT_COLOR: asNonEmptyString(values.bodyTextColor),
  });
}

function assembleNewsletter(parts) {
  return [
    asNonEmptyString(parts.containerStartHtml),
    asNonEmptyString(parts.headerHtml),
    asNonEmptyString(parts.introductionHtml),
    ...(Array.isArray(parts.sectionHtmlList) ? parts.sectionHtmlList : []),
    asNonEmptyString(parts.footerHtml),
    asNonEmptyString(parts.containerEndHtml),
  ]
    .filter(Boolean)
    .join("\n");
}

module.exports = {
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
