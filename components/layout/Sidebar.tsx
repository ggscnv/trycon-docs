"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLink {
  label: string;
  href: string;
  icon: string;
  badge?: string;
}

interface NavSection {
  sectionLabel: string;
  links: NavLink[];
}

interface SidebarProps {
  sections: NavSection[];
}

export default function Sidebar({ sections }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex h-[calc(100vh-64px)] w-72 fixed left-0 top-16 bg-[#0e0e0e] flex-col py-8 px-4 gap-2 overflow-y-auto no-scrollbar">
      {sections.map((section) => (
        <div key={section.sectionLabel} className="mb-6 px-4">
          <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-4">
            {section.sectionLabel}
          </p>
          <div className="space-y-1">
            {section.links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all text-sm ${
                    active
                      ? "bg-violet-500/10 text-primary border-r-2 border-primary rounded-r-lg"
                      : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50"
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">{link.icon}</span>
                  <span className="font-medium">{link.label}</span>
                  {link.badge && (
                    <span className="ml-auto text-[10px] bg-secondary-container/20 text-secondary-fixed-dim px-1.5 py-0.5 rounded border border-secondary/20">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      ))}

      <div className="mt-auto px-4">
        <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/10">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-tertiary text-sm">info</span>
            <span className="text-[11px] font-bold text-on-surface-variant">V1.0.0 STABLE</span>
          </div>
          <p className="text-[10px] text-zinc-500 leading-relaxed">
            Check our changelog for the latest documentation updates.
          </p>
        </div>
      </div>
    </aside>
  );
}
