import { cn } from "@/lib/utils";

const control =
  "rounded-[9px] border-[1.5px] px-3.5 py-[13px] text-[15px] text-ink outline-none transition-colors placeholder:text-faint/80 focus:border-brand";

export function Field({
  label,
  error,
  required,
  children,
  className,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("flex flex-col gap-[7px]", className)}>
      <span className="text-[13.5px] font-semibold text-slate">
        {label}
        {required && " *"}
      </span>
      {children}
      <span className="min-h-4 text-[12.5px] font-semibold text-danger">
        {error}
      </span>
    </label>
  );
}

export function inputClass(error?: string) {
  return cn(control, error ? "border-[#d9534f]" : "border-hairline", "bg-white");
}

export function textareaClass() {
  return cn(control, "border-hairline resize-y leading-[1.55]");
}
