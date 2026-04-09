"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { label: "Trainings", href: "/trainings" },
  { label: "Policies", href: "/policies" },
  { label: "Roles", href: "/roles" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-[#0f1e2e]">
      {/* Main navbar */}
      <div className="flex items-center px-8 h-[68px]">
        <Link href="/" className="flex flex-col mr-8">
          <span className="font-headline text-[22px] font-bold text-white tracking-[-0.4px] leading-tight">
            Trycon <span className="text-[#60a8e0]">People Hub</span>
          </span>
          <span className="text-[12px] text-white/40 leading-tight">
            Everything you need to know about how we work
          </span>
        </Link>

        {/* Desktop tab-style nav */}
        <nav className="hidden md:flex items-center h-full bg-[#1a2d4a] -mr-8 border-b border-white/[0.06]">
          {navLinks.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-7 h-[68px] flex items-center text-sm font-medium border-b-2 transition-all ${
                  active
                    ? "text-white border-[#60a8e0]"
                    : "text-white/45 border-transparent hover:text-white/75"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <div className="hidden sm:flex items-center bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 w-52 focus-within:border-[#60a8e0]/50 transition-all">
            <span className="material-symbols-outlined text-white/40 text-lg">search</span>
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none focus:ring-0 text-xs w-full text-white placeholder:text-white/30 outline-none ml-2"
            />
          </div>
          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-sm text-white/50" style={{ fontVariationSettings: "'FILL' 1" }}>
              account_circle
            </span>
          </div>
          <button
            className="md:hidden p-2 text-white/60"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className="material-symbols-outlined">{mobileOpen ? "close" : "menu"}</span>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="absolute top-[68px] left-0 w-full bg-[#1a2d4a] border-t border-white/10 py-3 px-6 flex flex-col md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/60 hover:text-white py-2.5 border-b border-white/5 last:border-0"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
