import Link from "next/link";

interface PaginationFooterProps {
  prev?: { label: string; href: string };
  next?: { label: string; href: string };
}

export default function PaginationFooter({ prev, next }: PaginationFooterProps) {
  return (
    <div className="flex justify-between items-center pt-10 border-t border-[#e2e2e6] mt-10">
      <div className="flex-1 max-w-[200px]">
        {prev && (
          <>
            <span className="text-[10px] font-semibold text-[#9a9aa8] block mb-2 uppercase tracking-wider">Previous</span>
            <Link
              href={prev.href}
              className="text-sm font-semibold text-[#5a5a68] hover:text-[#2677BD] transition-colors flex items-center gap-2"
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
            <span className="text-[10px] font-semibold text-[#9a9aa8] block mb-2 uppercase tracking-wider">Next</span>
            <Link
              href={next.href}
              className="text-sm font-semibold text-[#5a5a68] hover:text-[#2677BD] transition-colors flex items-center gap-2 justify-end"
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
