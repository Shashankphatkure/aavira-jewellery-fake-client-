import type { Review } from "./types";

const NAMES = [
  "Ananya S.",
  "Priya M.",
  "Ritika K.",
  "Sneha R.",
  "Divya T.",
  "Meera J.",
  "Kavya N.",
  "Aisha P.",
  "Neha V.",
  "Simran C.",
  "Ishita B.",
  "Pooja L.",
  "Tanvi A.",
  "Riya D.",
  "Nandini G.",
  "Aditi W.",
];

const TEMPLATES: { title: string; body: string }[] = [
  {
    title: "Exceeded expectations",
    body: "The photos don't do it justice — it looks even better in person. Wearing it almost every day since it arrived.",
  },
  {
    title: "Perfect everyday piece",
    body: "Lightweight, doesn't tarnish, and goes with everything. Exactly the 'wear it daily' piece I was looking for.",
  },
  {
    title: "Beautiful packaging too",
    body: "Arrived in gorgeous packaging, felt like unwrapping a gift even though I bought it for myself. Quality feels premium.",
  },
  {
    title: "Great gift",
    body: "Got this for my sister's birthday and she hasn't taken it off since. Delivery was quick and tracking was accurate.",
  },
  {
    title: "Worth every rupee",
    body: "Was hesitant about buying jewellery online but this changed my mind. The finish is so much nicer than I expected at this price.",
  },
  {
    title: "Good but sizing runs slightly different",
    body: "Lovely piece overall, just double check the sizing guide before you order. Customer support was helpful when I had questions.",
  },
  {
    title: "My new favourite",
    body: "I own a few Aavira pieces now and this might be my favourite. Subtle enough for work, pretty enough for evenings out.",
  },
  {
    title: "Held up well after weeks of wear",
    body: "Been wearing this non-stop for over a month, including through workouts, and it still looks brand new. Impressed.",
  },
  {
    title: "Exactly as pictured",
    body: "Colour and finish matched the website exactly, no surprises. Fast shipping too, arrived in 3 days.",
  },
  {
    title: "Lovely, understated design",
    body: "Not flashy at all, just quietly elegant. Gets compliments without being over the top. Would recommend.",
  },
  {
    title: "Great for sensitive ears",
    body: "I usually react to fashion jewellery but this has been completely fine for my skin. Comfortable for all-day wear.",
  },
  {
    title: "Even better than I hoped",
    body: "Ordered on a whim during a sale and it's become an everyday staple. The craftsmanship really shows up close.",
  },
];

export function makeReviews(seed: number, count: number): Review[] {
  const reviews: Review[] = [];
  for (let i = 0; i < count; i++) {
    const templateIndex = (seed * 3 + i * 5) % TEMPLATES.length;
    const nameIndex = (seed * 7 + i * 11) % NAMES.length;
    const rating = ((seed + i) % 5 === 0 ? 4 : 5) as Review["rating"];
    const day = 3 + ((seed * 5 + i * 9) % 24);
    const month = 1 + ((seed + i * 2) % 8);
    reviews.push({
      id: `r-${seed}-${i}`,
      author: NAMES[nameIndex],
      rating,
      title: TEMPLATES[templateIndex].title,
      body: TEMPLATES[templateIndex].body,
      date: `2026-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
      verified: (seed + i) % 4 !== 0,
    });
  }
  return reviews;
}

export function averageRating(reviews: Review[]): number {
  if (reviews.length === 0) return 5;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}
