import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = { title: "FAQ" };

const SECTIONS = [
  {
    title: "Orders & Payment",
    items: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept UPI, all major credit and debit cards, net banking, and Cash on Delivery (COD) on eligible pin codes. All online payments are processed securely at checkout.",
      },
      {
        question: "Can I change or cancel my order after placing it?",
        answer:
          "Orders can be changed or cancelled within 2 hours of placing them. Write to us at hello@aavirajewellery.com or reach out on WhatsApp with your order number and we'll take care of it.",
      },
      {
        question: "Do you offer Cash on Delivery?",
        answer:
          "Yes, COD is available on most pin codes across India for orders up to ₹10,000. You'll see if it's available for your pin code at checkout.",
      },
    ],
  },
  {
    title: "Shipping & Delivery",
    items: [
      {
        question: "How long does delivery take?",
        answer:
          "Most orders ship within 24-48 hours and arrive within 3-6 business days depending on your location. Metro cities are typically faster.",
      },
      {
        question: "Is shipping free?",
        answer:
          "Yes, we offer free shipping across India on all orders above ₹1,499. A flat fee of ₹79 applies to smaller orders.",
      },
      {
        question: "Can I track my order?",
        answer:
          "Absolutely. Once your order ships, you'll receive a tracking link by email and SMS so you can follow it in real time.",
      },
    ],
  },
  {
    title: "Returns & Exchanges",
    items: [
      {
        question: "What is your return policy?",
        answer:
          "We offer a 7-day easy return window from the date of delivery for unused pieces in original packaging. See our Returns & Refunds page for full details.",
      },
      {
        question: "Are earrings returnable?",
        answer:
          "For hygiene reasons, pierced earrings cannot be returned once the packaging seal is opened, unless the piece arrives damaged or defective.",
      },
      {
        question: "How long do refunds take?",
        answer:
          "Once we receive and inspect your return, refunds are processed within 5-7 business days to your original payment method.",
      },
    ],
  },
  {
    title: "Product & Care",
    items: [
      {
        question: "Will Aavira jewellery tarnish?",
        answer:
          "Our pieces are crafted with 18K gold vermeil and 925 sterling silver, which are far more durable than regular plated jewellery. With the care tips on our Jewellery Care page, your pieces will stay lustrous for years.",
      },
      {
        question: "Is Aavira jewellery skin-safe?",
        answer:
          "Yes. All our pieces are nickel-free and hypoallergenic, made to be worn every day without irritation.",
      },
      {
        question: "How do I find my ring size?",
        answer:
          "Each ring product page includes a simple sizing guide. If you're unsure, we recommend sizing up slightly or writing in to us for guidance.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Support"
        title="Frequently Asked Questions"
        description="Everything you need to know about ordering, shipping and caring for your Aavira pieces."
      />
      <div className="container-aavira py-14 md:py-20 max-w-3xl">
        <div className="flex flex-col gap-12">
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h2 className="font-display text-xl mb-2">{section.title}</h2>
              <Accordion items={section.items} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
