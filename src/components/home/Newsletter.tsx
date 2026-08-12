"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function Newsletter() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="container-aavira py-20 md:py-24">
      <Reveal className="border border-line px-6 py-14 md:py-16 text-center max-w-2xl mx-auto">
        <h2 className="font-display text-2xl md:text-3xl mb-3">
          Join the Aavira list
        </h2>
        <p className="text-charcoal-soft text-sm mb-7 max-w-md mx-auto leading-relaxed">
          New arrivals, styling edits, and first access to sales — no spam,
          just the good stuff.
        </p>

        {submitted ? (
          <p className="text-sm text-gold-deep">
            You&apos;re on the list. Welcome to Aavira.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto"
          >
            <input
              required
              type="email"
              placeholder="Your email address"
              className="flex-1 border border-line bg-cream px-4 py-3 text-sm outline-none focus:border-charcoal transition-colors"
            />
            <Button type="submit">Subscribe</Button>
          </form>
        )}
      </Reveal>
    </section>
  );
}
