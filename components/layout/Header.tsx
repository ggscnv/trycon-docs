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
    <header className="fixed top-0 w-full flex justify-between items-center px-6 h-16 bg-[#131313]/60 backdrop-blur-xl z-50 shadow-[0_0_12px_rgba(139,92,246,0.1)]">
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <span
              className="material-symbols-outlined text-on-primary-container text-xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              rocket_launch
            </span>
          </div>
          <span className="text-2xl font-black font-headline tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-emerald-400">
            Trycon Docs
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium py-1 transition-all duration-300 ${
                  active
                    ? "text-primary border-b-2 border-primary"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center bg-surface-container-lowest px-3 py-1.5 rounded-xl border border-outline-variant/15 w-64 group focus-within:ring-2 ring-primary/20 transition-all">
          <span className="material-symbols-outlined text-outline text-lg">search</span>
          <input
            type="text"
            placeholder="Search documentation..."
            className="bg-transparent border-none focus:ring-0 text-xs w-full text-on-surface placeholder:text-zinc-600 outline-none ml-2"
          />
          <span className="text-[10px] bg-surface-container-high px-1.5 py-0.5 rounded text-outline">/</span>
        </div>
        <div className="w-8 h-8 rounded-full overflow-hidden border border-primary/20 bg-surface-container-high flex items-center justify-center">
          <span className="material-symbols-outlined text-sm text-zinc-400" style={{ fontVariationSettings: "'FILL' 1" }}>
            account_circle
          </span>
        </div>
        <button
          className="md:hidden p-2 text-on-surface"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className="material-symbols-outlined">{mobileOpen ? "close" : "menu"}</span>
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="absolute top-16 left-0 w-full bg-[#0e0e0e] border-t border-outline-variant/10 py-4 px-6 flex flex-col gap-2 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-400 hover:text-zinc-200 py-2"
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
