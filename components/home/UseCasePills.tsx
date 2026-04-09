import Link from "next/link";

const useCases = [
  { label: "Make Videos", icon: "VID", query: "video" },
  { label: "Create Music", icon: "MUS", query: "music" },
  { label: "Write Code", icon: "DEV", query: "coding" },
  { label: "Write Content", icon: "WRT", query: "writing" },
  { label: "Design Logos", icon: "DSN", query: "design" },
  { label: "Clone Voices", icon: "VOI", query: "voice" },
  { label: "Make Presentations", icon: "PPT", query: "presentation" },
  { label: "Do Research", icon: "RSH", query: "research" },
  { label: "Build Apps", icon: "APP", query: "app" },
];

export function UseCasePills() {
  return (
    <section className="section-shell pt-0">
      <div className="mb-5">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.22em] text-cyan">Tools by use case</p>
        <h2 className="section-title">Start from your goal, not a category name</h2>
      </div>
      <div className="hide-scrollbar flex gap-3 overflow-x-auto pb-1">
        {useCases.map((item) => (
          <Link
            key={item.label}
            href={`/tools?q=${encodeURIComponent(item.query)}`}
            className="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-muted hover:border-white/20 hover:text-foreground"
          >
            <span className="mr-2 text-xs uppercase tracking-[0.12em]">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
