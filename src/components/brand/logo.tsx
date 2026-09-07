import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  width = 168,
  priority = false,
}: {
  className?: string;
  width?: number;
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="EPS Logistics — inicio"
      className={cn("inline-flex shrink-0 items-center", className)}
    >
      <Image
        src="/eps-logistics-logo.png"
        alt="EPS Logistics"
        width={width}
        height={Math.round((width * 1024) / 1536)}
        priority={priority}
        className="h-auto w-full max-w-full dark:brightness-125"
      />
    </Link>
  );
}
