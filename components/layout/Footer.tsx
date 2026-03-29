import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#131313] border-t border-zinc-800/15 py-12 px-8 mt-12 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col gap-2">
          <span className="font-headline font-bold text-zinc-300">Trycon Systems</span>
          <p className="font-body text-xs text-zinc-500">
            © 2025 Trycon Systems. Built with Neon Architect.
          </p>
        </div>
        <div className="flex items-center gap-6">
          {["Privacy", "Terms", "Support", "GitHub"].map((item) => (
            <Link
              key={item}
              href="#"
              className="font-body text-xs text-zinc-500 hover:text-emerald-400 transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
