import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = { title: "Privacy Policy" };

const SECTIONS = [
  {
    title: "Information we collect",
    body: "When you shop with us, we collect information you provide directly — your name, email, phone number, shipping address, and order details — along with basic usage data like pages visited and device type, to keep the site running smoothly.",
  },
  {
    title: "How we use your information",
    body: "We use your information to process orders, provide customer support, send order and shipping updates, and — only with your consent — send you occasional updates about new collections and offers. We never sell your personal information to third parties.",
  },
  {
    title: "Payment information",
    body: "All payments are processed through secure, PCI-compliant payment gateways. Aavira does not store your full card details on our servers.",
  },
  {
    title: "Cookies",
    body: "We use cookies to remember items in your bag and wishlist, keep you signed in, and understand how visitors use our site so we can improve it.",
  },
  {
    title: "Your rights",
    body: "You can request access to, correction of, or deletion of your personal data at any time by writing to hello@aavirajewellery.com.",
  },
  {
    title: "Changes to this policy",
    body: "We may update this policy from time to time. Material changes will be reflected on this page with an updated effective date.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div>
      <PageHeader eyebrow="Legal" title="Privacy Policy" />
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
