import Link from "next/link";
import GlowChip from "./GlowChip";

interface BreadcrumbBarProps {
  items: { label: string; href?: string }[];
  badge?: string;
  badgeVariant?: "primary" | "secondary" | "tertiary";
  readingTime?: number;
}

export default function BreadcrumbBar({
  items,
  badge,
  badgeVariant = "secondary",
  readingTime,
}: BreadcrumbBarProps) {
  return (
    <nav className="flex items-center gap-2 text-xs text-[#9a9aa8] mb-8 font-medium flex-wrap">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && (
            <span className="material-symbols-outlined text-[14px] text-[#c8c8d0]">chevron_right</span>
          )}
          {item.href ? (
            <Link href={item.href} className="hover:text-[#2677BD] transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-[#5a5a68]">{item.label}</span>
          )}
        </span>
      ))}
      {badge && (
        <GlowChip label={badge} variant={badgeVariant} />
      )}
      {readingTime && (
        <span className="text-[#9a9aa8] text-[10px] font-medium">· {readingTime} Min Read</span>
      )}
    </nav>
  );
}
