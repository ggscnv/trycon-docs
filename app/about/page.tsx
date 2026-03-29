import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-16 px-6 py-16 max-w-5xl mx-auto">
      <div className="mb-12">
        <span className="material-symbols-outlined text-primary text-4xl mb-4 block" style={{ fontVariationSettings: "'FILL' 1" }}>
          info
        </span>
        <h1 className="font-headline text-4xl font-black tracking-tight text-on-surface mb-3">
          About Trycon Systems
        </h1>
        <p className="text-zinc-400 text-sm">3 documents</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Company Mission & Values", uid: "mission-values", readingTime: 3, description: "What Trycon stands for and how we make decisions." },
          { title: "Company History", uid: "history", readingTime: 5, description: "How Trycon was founded and where we're headed." },
          { title: "Organizational Structure", uid: "org-structure", readingTime: 4, description: "How our teams are organized and how decisions flow." },
        ].map((doc) => (
          <Link
            key={doc.uid}
            href={`/about/${doc.uid}`}
            className="bg-surface-container-low p-6 rounded-2xl hover:bg-surface-container-high hover:border hover:border-primary/20 transition-all group block"
          >
            <span className="text-zinc-600 text-[10px] mb-3 block">{doc.readingTime} min read</span>
            <h3 className="font-bold text-zinc-200 mb-2 group-hover:text-primary transition-colors">{doc.title}</h3>
            <p className="text-xs text-zinc-500">{doc.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
