import { Gem, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const ITEMS = [
  { icon: <Gem size={18} strokeWidth={1.5} />, label: "18K Gold Vermeil" },
  { icon: <ShieldCheck size={18} strokeWidth={1.5} />, label: "Nickel-Free & Skin Safe" },
  { icon: <RotateCcw size={18} strokeWidth={1.5} />, label: "7-Day Easy Returns" },
  { icon: <Truck size={18} strokeWidth={1.5} />, label: "COD Available" },
];

export function TrustBar() {
  return (
    <Reveal>
      <div className="border-b border-line bg-cream">
        <div className="container-aavira grid grid-cols-2 sm:grid-cols-4 sm:divide-x divide-line">
          {ITEMS.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-center gap-2 py-4 sm:py-5 text-center"
            >
              <span className="text-gold-deep shrink-0">{item.icon}</span>
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.06em] text-charcoal-soft">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
