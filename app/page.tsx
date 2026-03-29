import Link from "next/link";

const categories = [
  {
    icon: "info",
    label: "About",
    description: "Company mission, values, and history.",
    href: "/about",
    color: "text-primary",
    count: "3 docs",
  },
  {
    icon: "policy",
    label: "Policies",
    description: "Remote work, leave, and conduct policies.",
    href: "/policies",
    color: "text-secondary",
    count: "8 docs",
  },
  {
    icon: "school",
    label: "Trainings",
    description: "Onboarding guides and tool walkthroughs.",
    href: "/trainings",
    color: "text-tertiary",
    count: "12 docs",
  },
  {
    icon: "badge",
    label: "Roles & Responsibilities",
    description: "Role expectations and team structure.",
    href: "/roles",
    color: "text-primary",
    count: "6 docs",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="px-6 py-24 max-w-5xl mx-auto">
        <div className="mb-4">
          <span className="bg-secondary/10 text-secondary border border-secondary/30 px-2 py-0.5 rounded-full text-xs shadow-[0_0_4px_rgba(78,222,163,0.4)] animate-pulse">
            Live
          </span>
        </div>
        <h1 className="font-headline text-5xl md:text-6xl font-black tracking-tight text-on-surface mb-6 leading-none max-w-3xl">
          Everything you need to know about Trycon.
        </h1>
        <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl mb-10">
          Your internal source of truth for policies, training, roles, and more.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="/trainings"
            className="bg-primary-container text-on-primary-container rounded-full px-6 py-3 text-sm font-bold shadow-[0_0_12px_rgba(139,92,246,0.2)] hover:shadow-[0_0_18px_rgba(139,92,246,0.35)] transition-all"
          >
            Browse Trainings
          </Link>
          <Link
            href="/policies"
            className="bg-surface-container-high text-on-surface rounded-full px-6 py-3 text-sm font-bold hover:bg-surface-container-highest transition-all"
          >
            View Policies
          </Link>
        </div>
      </section>

      {/* Category Cards */}
      <section className="px-6 pb-24 max-w-5xl mx-auto">
        <h2 className="font-headline text-2xl font-bold text-on-surface mb-8">Browse by category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="bg-surface-container-low p-6 rounded-2xl hover:bg-surface-container-high hover:border hover:border-primary/20 transition-all group cursor-pointer block"
            >
              <span
                className={`material-symbols-outlined ${cat.color} mb-4 block group-hover:scale-110 transition-transform text-3xl`}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {cat.icon}
              </span>
              <h3 className="font-bold text-zinc-200 mb-2">{cat.label}</h3>
              <p className="text-xs text-zinc-500 mb-4">{cat.description}</p>
              <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{cat.count}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
