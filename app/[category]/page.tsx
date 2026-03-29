import { notFound } from "next/navigation";
import Link from "next/link";
import * as prismic from "@prismicio/client";
import { createClient } from "@/lib/prismic";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ category: string }>;
}

const categoryConfig: Record<string, { label: string; icon: string }> = {
  trainings: { label: "Trainings", icon: "school" },
  policies: { label: "Policies", icon: "policy" },
  roles: { label: "Roles & Responsibilities", icon: "badge" },
  about: { label: "About", icon: "info" },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const config = categoryConfig[category];
  if (!config) return {};
  return { title: `${config.label} — Trycon Docs` };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const config = categoryConfig[category];
  if (!config) notFound();

  const client = createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let docs: any[] = [];
  try {
    docs = await client.getAllByType("doc_page", {
      filters: [prismic.filter.at("my.doc_page.category", category)],
      orderings: [{ field: "my.doc_page.title", direction: "asc" }],
    });
  } catch {
    // doc_page type not yet created in Prismic
  }

  return (
    <div className="min-h-screen pt-16 px-6 py-16 max-w-5xl mx-auto">
      <div className="mb-12">
        <span
          className="material-symbols-outlined text-primary text-4xl mb-4 block"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {config.icon}
        </span>
        <h1 className="font-headline text-4xl font-black tracking-tight text-on-surface mb-3">
          {config.label}
        </h1>
        <p className="text-zinc-400 text-sm">
          {docs.length} document{docs.length !== 1 ? "s" : ""}
        </p>
      </div>

      {docs.length === 0 ? (
        <div className="bg-surface-container-low rounded-2xl p-12 text-center">
          <span className="material-symbols-outlined text-zinc-600 text-4xl mb-4 block">
            folder_open
          </span>
          <p className="text-zinc-500 text-sm">No documents yet. Add some in Prismic.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {docs.map((doc) => (
            <Link
              key={doc.id}
              href={`/${category}/${doc.uid}`}
              className="bg-surface-container-low p-6 rounded-2xl hover:bg-surface-container-high hover:border hover:border-primary/20 transition-all group block"
            >
              <div className="flex items-center gap-2 mb-3">
                {doc.data.badge_label && (
                  <span
                    className={`text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full border ${
                      doc.data.badge_label === "Required"
                        ? "bg-tertiary/10 text-tertiary border-tertiary/30"
                        : "bg-secondary/10 text-secondary border-secondary/30"
                    }`}
                  >
                    {doc.data.badge_label}
                  </span>
                )}
                {doc.data.reading_time && (
                  <span className="text-zinc-600 text-[10px]">
                    {doc.data.reading_time} min read
                  </span>
                )}
              </div>
              <h3 className="font-bold text-zinc-200 mb-2 group-hover:text-primary transition-colors">
                {doc.data.title}
              </h3>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
