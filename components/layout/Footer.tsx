import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#e2e2e6] py-10 px-8 mt-12 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col gap-1">
          <span className="font-headline font-bold text-[#111] text-sm">
            Trycon <span className="text-[#2677BD]">People Hub</span>
          </span>
          <p className="text-xs text-[#9a9aa8]">
            © 2025 Trycon Systems. Internal use only.
          </p>
        </div>
        <div className="flex items-center gap-6">
          {["Privacy", "Terms", "Support"].map((item) => (
            <Link
              key={item}
              href="#"
              className="text-xs text-[#9a9aa8] hover:text-[#2677BD] transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
