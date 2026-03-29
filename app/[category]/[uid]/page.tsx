import Sidebar from "@/components/layout/Sidebar";
import TableOfContents from "@/components/layout/TableOfContents";
import BreadcrumbBar from "@/components/ui/BreadcrumbBar";
import PaginationFooter from "@/components/ui/PaginationFooter";
import SectionHeading from "@/components/ui/SectionHeading";

interface Props {
  params: Promise<{ category: string; uid: string }>;
}

const categoryLabels: Record<string, string> = {
  trainings: "Trainings",
  policies: "Policies",
  roles: "Roles & Responsibilities",
  about: "About",
};

const sidebarSections = [
  {
    sectionLabel: "Onboarding Path",
    links: [
      { label: "Onboarding Guide", href: "/trainings/onboarding-guide", icon: "assignment_ind", badge: "Required" },
    ],
  },
  {
    sectionLabel: "Tool Walkthroughs",
    links: [
      { label: "Tool Walkthrough: Jira", href: "/trainings/tool-jira", icon: "view_kanban" },
      { label: "Tool Walkthrough: Slack", href: "/trainings/tool-slack", icon: "chat" },
    ],
  },
  {
    sectionLabel: "Compliance",
    links: [
      { label: "Security Awareness Training", href: "/trainings/security-awareness", icon: "security" },
    ],
  },
];

const tocHeadings = [
  { id: "welcome", text: "Welcome", level: 2 },
  { id: "first-week", text: "Your First Week", level: 2 },
  { id: "tools", text: "Tools You'll Use", level: 2 },
  { id: "who-to-talk-to", text: "Who to Talk To", level: 2 },
  { id: "faqs", text: "FAQs", level: 2 },
];

export default async function DocPage({ params }: Props) {
  const { category, uid } = await params;
  const categoryLabel = categoryLabels[category] || category;

  // TODO: When Prismic is connected, fetch the doc here:
  // const client = createClient();
  // const page = await client.getByUID("doc_page", uid);

  // Suppress unused variable warning for uid
  void uid;

  return (
    <div className="flex min-h-screen pt-16">
      <Sidebar sections={sidebarSections} />

      <main className="flex-1 md:ml-72 lg:mr-72 px-6 py-12 lg:px-16">
        <div className="max-w-3xl mx-auto">
          <BreadcrumbBar
            items={[
              { label: categoryLabel, href: `/${category}` },
              { label: "Onboarding Guide" },
            ]}
            badge="Popular"
            badgeVariant="secondary"
            readingTime={12}
          />

          {/* Article Header */}
          <div className="mb-12">
            <h1 className="text-5xl font-black font-headline text-on-surface mb-6 tracking-tight leading-none">
              Onboarding Guide
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl">
              Welcome to the team! This guide will walk you through your first steps at Trycon Systems, from setting up your environment to meeting your squad.
            </p>
          </div>

          {/* Welcome Section */}
          <section className="mb-16" id="welcome">
            <SectionHeading number="01" id="welcome">Welcome</SectionHeading>
            <div className="bg-surface-container-low rounded-xl p-8 border-l-4 border-primary relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-6xl">handshake</span>
              </div>
              <p className="text-zinc-300 mb-6 leading-relaxed">
                We&apos;re thrilled to have you here. At Trycon, we build the future of decentralized architecture. Your role is pivotal in shaping how developers interact with our ecosystem.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant/10">
                  <span className="text-primary font-bold block mb-1">Our Mission</span>
                  <p className="text-xs text-zinc-500">Accelerate the global transition to high-performance modular systems.</p>
                </div>
                <div className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant/10">
                  <span className="text-secondary font-bold block mb-1">Your Growth</span>
                  <p className="text-xs text-zinc-500">Quarterly learning stipends and weekly dedicated deep-work sessions.</p>
                </div>
              </div>
            </div>
          </section>

          {/* First Week Section */}
          <section className="mb-16" id="first-week">
            <SectionHeading number="02">Your First Week</SectionHeading>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 border-secondary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px] text-secondary">check</span>
                </div>
                <div>
                  <h4 className="font-bold text-zinc-200 mb-1">Day 1: Environment Setup</h4>
                  <p className="text-sm text-zinc-500 mb-3">
                    Install the core dependencies and link your hardware key to the secure gateway.
                  </p>
                  <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10 font-mono text-xs text-secondary-fixed-dim">
                    <span className="text-zinc-600"># Install the CLI tools</span>
                    <br />
                    <span className="text-primary">npm</span> install trycon-sdk --global
                  </div>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 border-outline-variant/30 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-zinc-500">2</span>
                </div>
                <div>
                  <h4 className="font-bold text-zinc-200 mb-1">Day 2-3: Architecture Deep-Dive</h4>
                  <p className="text-sm text-zinc-500">
                    Review the &apos;Modular Core&apos; documentation and attend the Wednesday sync.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Tools Section */}
          <section className="mb-16" id="tools">
            <SectionHeading number="03">Tools You&apos;ll Use</SectionHeading>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { icon: "terminal", color: "text-primary", title: "VS Code", description: "Primary IDE with our custom 'Trycon Neon' extension theme." },
                { icon: "cloud", color: "text-secondary", title: "Vercel", description: "Used for our frontend deployments and preview branch staging." },
                { icon: "hub", color: "text-tertiary", title: "Linear", description: "How we manage tasks, cycles, and product roadmaps." },
              ].map((tool) => (
                <div key={tool.title} className="bg-surface-container-low p-6 rounded-2xl hover:bg-surface-container-high transition-all group cursor-default">
                  <span className={`material-symbols-outlined ${tool.color} mb-4 block group-hover:scale-110 transition-transform`}>
                    {tool.icon}
                  </span>
                  <h5 className="font-bold text-zinc-200 mb-2">{tool.title}</h5>
                  <p className="text-xs text-zinc-500">{tool.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Callout */}
          <div className="bg-tertiary-container/10 border border-tertiary/20 p-6 rounded-2xl flex gap-4 mb-16">
            <span className="material-symbols-outlined text-tertiary">warning</span>
            <div className="text-sm">
              <p className="font-bold text-tertiary mb-1">Attention Required</p>
              <p className="text-zinc-400">
                Before pushing any code, ensure you have configured your GPG keys. Check the Security Awareness module for instructions.
              </p>
            </div>
          </div>

          {/* Who to Talk To */}
          <section className="mb-16" id="who-to-talk-to">
            <SectionHeading number="04">Who to Talk To</SectionHeading>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-zinc-500 font-medium border-b border-outline-variant/10">
                  <tr>
                    <th className="pb-4 pr-4">Point of Contact</th>
                    <th className="pb-4 pr-4">Area</th>
                    <th className="pb-4">Slack Channel</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {[
                    { initials: "JD", name: "Jane Doe", area: "Engineering Lead", slack: "#eng-hq" },
                    { initials: "AS", name: "Alex Smith", area: "Security / DevOps", slack: "#ops-alert" },
                  ].map((contact) => (
                    <tr key={contact.name}>
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] text-zinc-400 font-bold">
                            {contact.initials}
                          </div>
                          <span className="font-medium">{contact.name}</span>
                        </div>
                      </td>
                      <td className="py-4 pr-4 text-zinc-400">{contact.area}</td>
                      <td className="py-4 font-mono text-primary">{contact.slack}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-16" id="faqs">
            <h2 className="text-2xl font-bold font-headline mb-6">FAQs</h2>
            <div className="space-y-4">
              {[
                { q: "Where do I find the API Keys?", a: "API keys are managed via the Vault dashboard. You will need a developer-role assignment before you can access them." },
                { q: "What is the policy for Remote Work?", a: "We are 100% remote-first. We recommend core availability between 10am and 3pm EST for synchronous syncs." },
              ].map((faq) => (
                <details key={faq.q} className="group bg-surface-container-low rounded-xl border border-outline-variant/10 overflow-hidden">
                  <summary className="p-4 cursor-pointer flex justify-between items-center list-none hover:bg-white/5 transition-all">
                    <span className="font-medium text-zinc-200">{faq.q}</span>
                    <span className="material-symbols-outlined text-zinc-500 group-open:rotate-180 transition-transform">expand_more</span>
                  </summary>
                  <div className="p-4 pt-0 text-sm text-zinc-400 border-t border-outline-variant/5">{faq.a}</div>
                </details>
              ))}
            </div>
          </section>

          <PaginationFooter
            prev={{ label: "Training Home", href: "/trainings" }}
            next={{ label: "Tool Walkthrough: Jira", href: "/trainings/tool-jira" }}
          />
        </div>
      </main>

      <TableOfContents headings={tocHeadings} />
    </div>
  );
}
