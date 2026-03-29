import Link from "next/link";

interface Props {
  params: Promise<{ category: string }>;
}

const categoryConfig: Record<string, { label: string; icon: string }> = {
  trainings: { label: "Trainings", icon: "school" },
  policies: { label: "Policies", icon: "policy" },
  roles: { label: "Roles & Responsibilities", icon: "badge" },
  about: { label: "About", icon: "info" },
};

// Placeholder docs for each category
const placeholderDocs: Record<string, { title: string; uid: string; badge?: string; readingTime: number; description: string }[]> = {
  trainings: [
    { title: "Onboarding Guide", uid: "onboarding-guide", badge: "Popular", readingTime: 10, description: "Your complete guide to getting started at Trycon Systems." },
    { title: "Tool Walkthrough: Jira", uid: "tool-jira", readingTime: 5, description: "How we use Jira for project management and task tracking." },
    { title: "Security Awareness Training", uid: "security-awareness", badge: "Required", readingTime: 8, description: "Essential security practices every Trycon employee must know." },
  ],
  policies: [
    { title: "Remote Work Policy", uid: "remote-work", readingTime: 6, description: "Guidelines for remote work, core hours, and expectations." },
    { title: "Leave Policy", uid: "leave-policy", readingTime: 4, description: "PTO, sick leave, and holiday entitlements." },
    { title: "Code of Conduct", uid: "code-of-conduct", badge: "Required", readingTime: 7, description: "Expected standards of behavior and professional conduct." },
  ],
  roles: [
    { title: "Engineering Lead", uid: "engineering-lead", readingTime: 5, description: "Responsibilities and expectations for engineering leads." },
    { title: "Product Designer", uid: "product-designer", readingTime: 4, description: "Design process, tools, and collaboration expectations." },
    { title: "Engineering Manager", uid: "engineering-manager", readingTime: 5, description: "People management and technical oversight responsibilities." },
  ],
  about: [
    { title: "Company Mission & Values", uid: "mission-values", readingTime: 3, description: "What Trycon stands for and how we make decisions." },
    { title: "Company History", uid: "history", readingTime: 5, description: "How Trycon was founded and where we're headed." },
    { title: "Organizational Structure", uid: "org-structure", readingTime: 4, description: "How our teams are organized and how decisions flow." },
  ],
};

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const config = categoryConfig[category] || { label: category, icon: "folder" };
  const docs = placeholderDocs[category] || [];

  return (
    <div className="min-h-screen pt-16 px-6 py-16 max-w-5xl mx-auto">
      <div className="mb-12">
        <span className="material-symbols-outlined text-primary text-4xl mb-4 block" style={{ fontVariationSettings: "'FILL' 1" }}>
          {config.icon}
        </span>
        <h1 className="font-headline text-4xl font-black tracking-tight text-on-surface mb-3">
          {config.label}
        </h1>
        <p className="text-zinc-400 text-sm">{docs.length} documents</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {docs.map((doc) => (
          <Link
            key={doc.uid}
            href={`/${category}/${doc.uid}`}
            className="bg-surface-container-low p-6 rounded-2xl hover:bg-surface-container-high hover:border hover:border-primary/20 transition-all group block"
          >
            <div className="flex items-center gap-2 mb-3">
              {doc.badge && (
                <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full border ${
                  doc.badge === "Required"
                    ? "bg-tertiary/10 text-tertiary border-tertiary/30"
                    : "bg-secondary/10 text-secondary border-secondary/30"
                }`}>
                  {doc.badge}
                </span>
              )}
              <span className="text-zinc-600 text-[10px]">{doc.readingTime} min read</span>
            </div>
            <h3 className="font-bold text-zinc-200 mb-2 group-hover:text-primary transition-colors">
              {doc.title}
            </h3>
            <p className="text-xs text-zinc-500">{doc.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
