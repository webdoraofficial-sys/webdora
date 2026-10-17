/**
 * Webdora Social & Direct Contact Links Configuration
 *
 * Update these fields with your official profile URLs and email address.
 *
 * Behavior:
 * - When a field is populated, the footer renders a fully accessible, clickable link.
 *   (External URLs open in a new tab with rel="noopener noreferrer"; email uses mailto:).
 * - When left empty (""), the item is displayed in an inactive/pending state without
 *   a clickable link, ensuring no dead links, `#`, or invalid URLs are rendered.
 */
export const socialLinks = {
  // Configurable contact email address (e.g., "hello@webdora.design")
  email: "",

  // Configurable Instagram profile URL (e.g., "https://instagram.com/webdora")
  instagram: "",

  // Configurable GitHub profile or organization URL (e.g., "https://github.com/webdora")
  github: "",

  // Configurable LinkedIn company or profile URL (e.g., "https://linkedin.com/company/webdora")
  linkedin: "",
};

export default socialLinks;
