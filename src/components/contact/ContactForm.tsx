"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";

const inputClasses =
  "w-full border border-line bg-cream px-4 py-3 text-sm outline-none focus:border-charcoal transition-colors";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="border border-line bg-cream p-8">
        <h2 className="font-display text-xl mb-2">Message sent</h2>
        <p className="text-sm text-charcoal-soft leading-relaxed">
          Thank you for reaching out. Our team will get back to you within
          one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <input
          required
          name="name"
          placeholder="Your name"
          className={inputClasses}
        />
        <input
          required
          type="email"
          name="email"
          placeholder="Email address"
          className={inputClasses}
        />
      </div>
      <input
        required
        name="subject"
        placeholder="Subject"
        className={inputClasses}
      />
      <textarea
        required
        name="message"
        placeholder="How can we help?"
        rows={5}
        className={inputClasses}
      />
      <Button type="submit" className="self-start">
        Send Message
      </Button>
    </form>
  );
}
