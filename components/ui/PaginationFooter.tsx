import Link from "next/link";

interface PaginationFooterProps {
  prev?: { label: string; href: string };
  next?: { label: string; href: string };
}

export default function PaginationFooter({ prev, next }: PaginationFooterProps) {
  return (
    <div className="flex justify-between items-center pt-12 border-t border-outline-variant/10">
      <div className="flex-1 max-w-[200px]">
        {prev && (
          <>
            <span className="text-[10px] font-bold text-zinc-500 block mb-2">PREVIOUS</span>
            <Link
              href={prev.href}
              className="text-sm font-bold hover:text-primary transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-xs">arrow_back</span>
              {prev.label}
            </Link>
          </>
        )}
      </div>
      <div className="flex-1 max-w-[200px] text-right">
        {next && (
          <>
            <span className="text-[10px] font-bold text-zinc-500 block mb-2">NEXT</span>
            <Link
              href={next.href}
              className="text-sm font-bold hover:text-primary transition-colors flex items-center gap-2 justify-end"
            >
              {next.label}
              <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
