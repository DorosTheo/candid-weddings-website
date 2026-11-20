/**
 * THE EXPERIENCE
 * Update `deliveryTimeframe` if your delivery policy changes — it is used
 * everywhere the timeframe is mentioned.
 */
export const deliveryTimeframe = "3–4 months";

export type ExperienceStep = { number: string; title: string; body: string };

export const experienceSteps: ExperienceStep[] = [
  {
    number: "01",
    title: "Let’s Connect",
    body: "First, we’ll hop on a call or meet for coffee to get to know each other and chat about your vision.",
  },
  {
    number: "02",
    title: "Booking & Planning",
    body: "Once you’re ready to lock in your date, we’ll make things official. We’ll be here to help with timelines, advice and anything else you need.",
  },
  {
    number: "03",
    title: "Your Big Day",
    body: "You enjoy your wedding, and we’ll take care of capturing every incredible moment.",
  },
  {
    number: "04",
    title: "Your Photos & Videos",
    body: `Within ${deliveryTimeframe}, you’ll receive your beautifully edited gallery, ready to relive your day all over again.`,
  },
];

export const experienceIntro = {
  statement:
    "Whether it’s a quiet glance, a burst of laughter, or the wild dance moves at the reception — we’ll be there, camera in hand, making sure every moment is captured beautifully.",
  title: "The Experience",
  subtitle: "From our first chat to the final gallery — here’s what to expect.",
};
