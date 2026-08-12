"use client";

import { useEffect, useState } from "react";

const MESSAGES = [
  "Free shipping across India on orders above ₹1,499",
  "New: The Monsoon Edit — everyday pieces, just in",
  "Cash on Delivery available at checkout",
];

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % MESSAGES.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-charcoal text-cream text-center text-[11px] sm:text-xs tracking-[0.08em] py-2.5 px-4">
      <p key={index} className="animate-fade-in">
        {MESSAGES[index]}
      </p>
    </div>
  );
}
