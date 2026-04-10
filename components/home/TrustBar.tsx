const brands = [
  "Midjourney",
  "OpenAI",
  "Google",
  "Adobe",
  "GitHub",
  "ElevenLabs",
  "Runway",
  "Anthropic",
  "Stability AI",
  "Canva",
  "Notion",
  "Cursor",
  "Suno",
  "Perplexity",
];

export function TrustBar() {
  const items = [...brands, ...brands];

  return (
    <section className="text-marquee-shell border-b border-border bg-surface-soft">
      <div className="page-shell py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Featuring tools from:
          </p>
          <div className="min-w-0 flex-1 overflow-hidden sm:min-h-[1.5rem]">
            <div className="text-marquee-track gap-10">
              {items.map((brand, index) => (
                <span
                  key={`${brand}-${index}`}
                  className="shrink-0 text-sm font-semibold tracking-[0.06em] text-white/45"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
