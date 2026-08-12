import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = { title: "Terms & Conditions" };

const SECTIONS = [
  {
    title: "About Aavira",
    body: "Aavira Jewellery is an online fashion jewellery retailer based in Mumbai, India. By using our website or placing an order, you agree to the terms below.",
  },
  {
    title: "Orders & pricing",
    body: "All prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise. We reserve the right to correct pricing errors and to cancel orders placed at an incorrect price, with a full refund.",
  },
  {
    title: "Product accuracy",
    body: "We try to represent every piece as accurately as possible through photography and descriptions. Slight variations in colour or finish may occur due to screen settings or the handcrafted nature of some pieces.",
  },
  {
    title: "Intellectual property",
    body: "All content on this site — including designs, photography, and copy — is the property of Aavira Jewellery and may not be reproduced without written permission.",
  },
  {
    title: "Limitation of liability",
    body: "Aavira Jewellery is not liable for indirect or incidental damages arising from the use of our products or website, to the extent permitted by applicable law.",
  },
  {
    title: "Governing law",
    body: "These terms are governed by the laws of India, and any disputes will be subject to the jurisdiction of the courts of Mumbai, Maharashtra.",
  },
];

export default function TermsPage() {
  return (
    <div>
      <PageHeader eyebrow="Legal" title="Terms & Conditions" />
      <div className="container-aavira py-14 md:py-20 max-w-2xl">
        <p className="text-sm text-charcoal-faint mb-10">
          Effective date: 1 January 2026
        </p>
        <div className="flex flex-col gap-10">
          {SECTIONS.map((section) => (
            <section key={section.title}>
              <h2 className="font-display text-xl mb-2">{section.title}</h2>
              <p className="text-sm text-charcoal-soft leading-relaxed">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
