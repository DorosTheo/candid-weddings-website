/**
 * PAGE COPY
 * All editorial text lives here so wording can be changed without touching
 * layout components. Only facts supplied by Candid Weddings Co. are used —
 * no invented biographies, awards, testimonials or client names.
 */
import { site } from "./site";

export const homeCopy = {
  hero: {
    lines: ["Real moments.", "Real emotions.", "Captured forever."],
    kicker: "Wedding Photography & Cinematography",
    location: "Cyprus — Worldwide",
  },
  intro: {
    heading: "More than just photos & videos",
    italic: "it’s about telling your story.",
    body: [
      "We believe the most beautiful photographs come from the moments that happen naturally.",
      "The quiet glances, the uncontrollable laughter, the unexpected moments and everything in between.",
      "Our approach is simple: let you enjoy your wedding while we capture the story as it unfolds.",
    ],
  },
  featured: {
    label: "Selected stories",
    heading: "Real weddings,",
    italic: "told honestly.",
  },
  founders: {
    label: "The people behind the camera",
    heading: "Two perspectives.",
    italic: "One shared vision.",
    body: [
      "We’re Doros & George, the creative people behind Candid Weddings Co.",
      "With a background in fashion and a passion for storytelling, we bring an artistic perspective to every wedding we capture.",
      "Our goal is to create photographs and films that feel personal, timeless and unmistakably yours.",
    ],
  },
  services: {
    label: "What we do",
    heading: "Photography",
    italic: "& cinematography.",
    items: [
      { index: "01", title: "Wedding Photography", body: "Editorial, documentary and quietly timeless." },
      { index: "02", title: "Cinematic Wedding Films", body: "The sound, movement and feeling of your day." },
      { index: "03", title: "Visual Storytelling", body: "Every image part of one honest, complete story." },
    ],
  },
  finalCta: {
    statement: ["Your story deserves", "to be remembered", "beautifully."],
    body: "Tell us about your plans — whether you’re marrying in Cyprus or further afield, we’d love to hear from you.",
  },
};

export const aboutCopy = {
  intro: {
    heading: "More than just photos & videos",
    italic: "it’s about telling your story.",
    body: [
      "We’re Doros & George, the creative people behind Candid Weddings Co. With a background in fashion, we infuse elegance and artistry into every wedding we capture.",
      "Our mission is to turn your love story into stunning visuals that reflect your unique style and personality.",
    ],
  },
  meet: {
    label: "Meet us",
    heading: "Doros",
    italic: "& George.",
    body: "Two creative minds, one studio and one shared way of seeing — so your day is seen from two perspectives, and told as one story.",
  },
  background: {
    label: "Our creative background",
    heading: "Shaped by fashion,",
    italic: "led by feeling.",
    body: [
      "We come from the world of fashion, and it shows in the way we work: an eye for composition, light, styling and detail.",
      "But at a wedding, aesthetics are never the point on their own. We use that eye to frame what’s really happening — so your photographs feel elegant without ever feeling staged.",
    ],
  },
  approach: {
    label: "Our approach",
    quote: [
      "We believe the best wedding photos and videos come from real moments.",
      "That’s why our approach is relaxed, natural and unobtrusive.",
      "We want you to feel your day, not like you’re in a photoshoot.",
      "We’ll guide you when needed, but mostly, we’ll let you just be.",
    ],
  },
  philosophy: {
    label: "Our philosophy",
    heading: "Quality over",
    italic: "quantity.",
    body: [
      "We would rather give you photographs you’ll treasure than thousands you’ll scroll past.",
      "Timeless over trendy, honest over perfect, and always, always about the two of you.",
    ],
  },
  storytelling: {
    label: "Our passion for storytelling",
    heading: "Every wedding",
    italic: "has its own story.",
    body: "The nerves before the ceremony, the first look, the speeches, the dance floor at midnight. We follow the day as it unfolds — in photographs that hold a moment still, and films that let you hear and feel it all again.",
  },
};

export const realWeddingsCopy = {
  heading: "A glimpse into the love stories we’ve captured.",
  body: "Every wedding is unique, and that’s what makes this experience so special. Here’s a collection of our favourite moments — filled with love, joy and everything in between.",
};

export const portfolioCopy = {
  heading: "Portfolio",
  italic: "moments, as they happened.",
  body: "A selection of photographs from the weddings we’ve had the privilege to document — in Cyprus and beyond.",
};

export const contactCopy = {
  heading: "Let’s talk.",
  intro:
    "If you love what you see and feel like we’d be a great fit, let’s chat! Whether you have questions or are ready to book, we’d love to hear from you.",
  emailLine: "Fill out the form below or email us at",
  success: {
    heading: "Thank you.",
    body: "Thank you for reaching out! We’ve received your inquiry and will be in touch soon.",
  },
  email: site.email,
};
