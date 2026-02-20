const REQUIRED_TEMPLATES = [
  "container-start.html",
  "container-end.html",
  "header.html",
  "divider.html",
  "text-block.html",
  "section.html",
  "button.html",
  "footer.html",
];

const DEFAULTS = {
  heading_font_family: "Montserrat, helvetica, arial, sans-serif",
  body_font_family: "Montserrat, helvetica, arial, sans-serif",
  accent_color: "#f93549",
  header_bg_color: "",
  header_title_color: "#ffffff",
  header_subtitle_color: "#ffffff",
  body_text_color: "#000000",
  button_bg_color: "#f93549",
  button_text_color: "#ffffff",
  email_background_color: "#f0f0f0",
  content_background_color: "#ffffff",
  header_logo_width: "260",
  footer_logo_width: "200",
};

const SOCIAL_ICON_DEFAULTS = {
  facebook:
    "https://athena-automation-files.s3.ap-southeast-2.amazonaws.com/facebook_icon.svg",
  instagram:
    "https://athena-automation-files.s3.ap-southeast-2.amazonaws.com/Instagram-Icon.png",
  linkedin:
    "https://athena-automation-files.s3.ap-southeast-2.amazonaws.com/linkedin_icon.svg",
  website:
    "https://athena-automation-files.s3.ap-southeast-2.amazonaws.com/website_icon.svg",
};

module.exports = {
  REQUIRED_TEMPLATES,
  DEFAULTS,
  SOCIAL_ICON_DEFAULTS,
};
