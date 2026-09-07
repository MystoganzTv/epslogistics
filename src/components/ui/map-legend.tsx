import { legend } from "@/lib/site";
import { cn } from "@/lib/utils";

export function MapLegend({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-[11px]", className)}>
      {legend.map((l) => (
        <div key={l.label} className="flex items-center gap-[11px]">
          <span
            className="size-[13px] shrink-0 rounded"
            style={{ background: l.color }}
          />
          <span
            className={cn(
              "text-[14.5px] font-semibold",
              tone === "light" ? "text-slate" : "text-onDark-strong",
            )}
          >
            {l.label}
          </span>
        </div>
      ))}
    </div>
  );
}
