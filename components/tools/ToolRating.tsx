import type { Tool } from "@/lib/tools";

const rows: Array<keyof Tool["rating"]> = [
  "overall",
  "easeOfUse",
  "features",
  "valueForMoney",
  "support",
];

export function ToolRating({ rating }: { rating: Tool["rating"] }) {
  return (
    <div className="grid gap-3">
      {rows.map((key) => (
        <div key={key} className="grid gap-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted">{key === "easeOfUse" ? "Ease of use" : key === "valueForMoney" ? "Value for money" : key.charAt(0).toUpperCase() + key.slice(1)}</span>
            <span className="font-semibold text-foreground">{rating[key].toFixed(1)}</span>
          </div>
          <div className="h-2 rounded-full bg-surface-soft">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple to-cyan"
              style={{ width: `${(rating[key] / 5) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
