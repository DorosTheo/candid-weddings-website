/**
 * PAGE COPY
 * All editorial text lives here so wording can be changed without touching
 * layout components. Only facts supplied by Candid Weddings Co. are used —
 * no invented biographies, awards, testimonials or client names.
 */
import { site } from "./site";

export const homeCopy = {
  hero: {
    line: "Real moments, captured forever.",
    kicker: "Wedding photography & film — Cyprus & worldwide",
  },
  intro: {
    heading: "More than photos & videos —",
    italic: "your story, as it unfolds.",
    body: "We document the quiet glances, the laughter and everything in between, so you can simply enjoy your day.",
  },
  work: {
    heading: "Selected weddings",
    link: "View the gallery",
  },
  founders: {
    heading: "Doros & George",
    body: "Two perspectives, one shared vision. With a background in fashion and a passion for storytelling, we create photographs and films that feel personal, timeless and unmistakably yours.",
    link: "About us",
  },
};

export const aboutCopy = {
  intro: {
    heading: "More than photos & videos —",
    italic: "it’s about telling your story.",
    body: [
      "We’re Doros & George, the creative people behind Candid Weddings Co. With a background in fashion, we bring elegance and artistry to every wedding we capture.",
      "Our mission is to turn your love story into images and films that reflect your style and personality.",
    ],
  },
  approach: {
    label: "Our approach",
    statement:
      "We believe the best wedding photos and videos come from real moments. That’s why our approach is relaxed, natural and unobtrusive. We want you to feel your day, not like you’re in a photoshoot. We’ll guide you when needed — but mostly, we’ll let you just be.",
  },
};

export const galleryCopy = {
  heading: "Gallery",
  body: "A glimpse into the love stories we’ve captured — in Cyprus and beyond.",
};

export const contactCopy = {
  heading: "Let’s talk.",
  intro:
    "If you love what you see and feel like we’d be a great fit, we’d love to hear from you — whether you have questions or are ready to book.",
  emailLine: "Fill out the form below or email us at",
  success: {
    heading: "Thank you.",
    body: "Thank you for reaching out! We’ve received your inquiry and will be in touch soon.",
  },
  email: site.email,
};
