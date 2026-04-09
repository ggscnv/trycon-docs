import Link from "next/link";

const categories = [
  {
    icon: "info",
    label: "About",
    description: "Company mission, values, and history.",
    href: "/about",
    color: "text-[#2677BD]",
    iconBg: "bg-[#e8f2fb]",
    count: "3 docs",
  },
  {
    icon: "policy",
    label: "Policies",
    description: "Remote work, leave, and conduct policies.",
    href: "/policies",
    color: "text-[#6766DF]",
    iconBg: "bg-[#eeeeff]",
    count: "8 docs",
  },
  {
    icon: "school",
    label: "Trainings",
    description: "Onboarding guides and tool walkthroughs.",
    href: "/trainings",
    color: "text-[#C0392B]",
    iconBg: "bg-[#faeae8]",
    count: "12 docs",
  },
  {
    icon: "badge",
    label: "Roles & Responsibilities",
    description: "Role expectations and team structure.",
    href: "/roles",
    color: "text-[#2677BD]",
    iconBg: "bg-[#e8f2fb]",
    count: "6 docs",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen pt-[68px]">
      {/* Hero */}
      <section className="px-8 py-20 max-w-5xl mx-auto">
        <div className="mb-4">
          <span className="bg-[#e8f2fb] text-[#2677BD] border border-[#b8d6f0] px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
            Live
          </span>
        </div>
        <h1 className="font-headline text-5xl md:text-6xl font-black tracking-tight text-[#111] mb-6 leading-none max-w-3xl">
          Everything you need to know about Trycon.
        </h1>
        <p className="text-lg text-[#5a5a68] leading-relaxed max-w-2xl mb-10">
          Your internal source of truth for policies, training, roles, and more.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="/trainings"
            className="bg-[#2677BD] text-white rounded-lg px-6 py-3 text-sm font-semibold hover:bg-[#1a5a9c] transition-colors"
          >
            Browse Trainings
          </Link>
          <Link
            href="/policies"
            className="bg-white text-[#5a5a68] rounded-lg px-6 py-3 text-sm font-semibold border border-[#e2e2e6] hover:bg-[#f7f7f8] transition-colors"
          >
            View Policies
          </Link>
        </div>
      </section>

      {/* Category Cards */}
      <section className="px-8 pb-24 max-w-5xl mx-auto">
        <h2 className="font-headline text-xl font-bold text-[#111] mb-6">Browse by category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="bg-white p-6 rounded-2xl border border-[#e2e2e6] hover:border-[#b8d6f0] hover:shadow-md transition-all group cursor-pointer block"
            >
              <span
                className={`material-symbols-outlined ${cat.color} ${cat.iconBg} w-10 h-10 flex items-center justify-center rounded-lg mb-4 group-hover:scale-110 transition-transform text-2xl`}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {cat.icon}
              </span>
              <h3 className="font-bold text-[#111] mb-1.5 text-sm">{cat.label}</h3>
              <p className="text-xs text-[#9a9aa8] mb-4 leading-relaxed">{cat.description}</p>
              <span className="text-[10px] font-semibold text-[#9a9aa8] uppercase tracking-wider">{cat.count}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
