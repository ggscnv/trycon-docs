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
    <aside className="hidden md:flex h-[calc(100vh-68px)] w-60 fixed left-0 top-[68px] bg-white border-r border-[#e2e2e6] flex-col overflow-y-auto no-scrollbar">
      {sections.map((section, i) => (
        <div key={section.sectionLabel}>
          <p className="text-[10px] uppercase tracking-[1px] text-[#9a9aa8] px-5 pt-4 pb-1.5 font-semibold">
            {section.sectionLabel}
          </p>
          <div>
            {section.links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2.5 px-5 py-[11px] text-sm border-l-[3px] transition-all ${
                    active
                      ? "bg-[#e8f2fb] text-[#2677BD] font-medium border-l-[#2677BD]"
                      : "text-[#5a5a68] border-l-transparent hover:bg-[#f7f7f8] hover:text-[#111]"
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[18px] flex-shrink-0"
                    style={{ opacity: active ? 1 : 0.6 }}
                  >
                    {link.icon}
                  </span>
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="ml-auto text-[10px] bg-[#e8f2fb] text-[#2677BD] px-2 py-0.5 rounded-full border border-[#b8d6f0] font-semibold">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
          {i < sections.length - 1 && (
            <div className="h-px bg-[#e2e2e6] my-2" />
          )}
        </div>
      ))}
    </aside>
  );
}
