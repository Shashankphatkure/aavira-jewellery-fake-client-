import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Get in touch"
        title="We'd love to hear from you"
        description="Questions about an order, sizing, or just want to say hi? Reach out — we usually respond within a day."
      />
      <div className="container-aavira py-14 md:py-20 grid md:grid-cols-2 gap-16">
        <div>
          <ContactForm />
        </div>
        <div className="flex flex-col gap-8">
          <ContactRow
            icon={<Mail size={18} strokeWidth={1.5} />}
            label="Email"
            value="hello@aavirajewellery.com"
          />
          <ContactRow
            icon={<MessageCircle size={18} strokeWidth={1.5} />}
            label="WhatsApp"
            value="+91 98765 43210"
          />
          <ContactRow
            icon={<Phone size={18} strokeWidth={1.5} />}
            label="Call us"
            value="+91 98765 43210 (Mon–Sat, 10am–7pm)"
          />
          <ContactRow
            icon={<MapPin size={18} strokeWidth={1.5} />}
            label="Studio"
            value="Bandra West, Mumbai, Maharashtra 400050"
          />
        </div>
      </div>
    </div>
  );
}

function ContactRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="h-10 w-10 shrink-0 rounded-full bg-gold-pale flex items-center justify-center text-gold-deep">
        {icon}
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.12em] text-charcoal-faint mb-1">
          {label}
        </p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}
