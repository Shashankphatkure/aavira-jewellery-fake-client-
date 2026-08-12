export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="container-aavira pt-14 pb-10 md:pt-20 md:pb-14 border-b border-line">
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.16em] text-gold-deep mb-3">
          {eyebrow}
        </p>
      )}
      <h1 className="font-display text-4xl md:text-5xl text-balance max-w-2xl">
        {title}
      </h1>
      {description && (
        <p className="mt-4 text-charcoal-soft max-w-xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
