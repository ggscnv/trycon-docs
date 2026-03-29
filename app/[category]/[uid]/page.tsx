import { notFound } from "next/navigation";
import * as prismic from "@prismicio/client";
import { createClient } from "@/lib/prismic";
import type { Metadata } from "next";
import Sidebar from "@/components/layout/Sidebar";
import TableOfContents from "@/components/layout/TableOfContents";
import BreadcrumbBar from "@/components/ui/BreadcrumbBar";
import PaginationFooter from "@/components/ui/PaginationFooter";
import SliceZone from "@/components/slices/SliceZone";

interface Props {
  params: Promise<{ category: string; uid: string }>;
}

const categoryLabels: Record<string, string> = {
  trainings: "Trainings",
  policies: "Policies",
  roles: "Roles & Responsibilities",
  about: "About",
};

export async function generateStaticParams() {
  try {
    const client = createClient();
    const pages = await client.getAllByType("doc_page");
    return pages.map((page) => ({
      category: page.data.category ?? "trainings",
      uid: page.uid,
    }));
  } catch {
    // No doc_page type yet — return empty until content is added in Prismic
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  try {
    const page = await client.getByUID("doc_page", uid);
    return { title: `${page.data.title} — Trycon Docs` };
  } catch {
    return {};
  }
}

export default async function DocPage({ params }: Props) {
  const { category, uid } = await params;
  const client = createClient();

  // Fetch the doc and the navigation in parallel
  const [page, allDocs, navDoc] = await Promise.all([
    client.getByUID("doc_page", uid).catch(() => null),
    client.getAllByType("doc_page", {
      filters: [prismic.filter.at("my.doc_page.category", category)],
      orderings: [{ field: "my.doc_page.title", direction: "asc" }],
    }),
    client.getSingle("navigation").catch(() => null),
  ]);

  if (!page) notFound();

  const categoryLabel = categoryLabels[category] || category;

  // Build sidebar sections from Prismic navigation doc (fall back to empty)
  const sidebarSections =
    navDoc?.data.nav_sections?.map((section) => ({
      sectionLabel: section.section_label ?? "",
      links: (section.links ?? []).map((link) => ({
        label: link.label ?? "",
        href:
          link.link && "url" in link.link
            ? (link.link.url ?? "#")
            : "#",
        icon: link.icon ?? "article",
        badge: link.badge ?? undefined,
      })),
    })) ?? [];

  // Build TOC from slice content (h2/h3 headings in RichText slices)
  const headings: { id: string; text: string; level: number }[] = [];
  for (const slice of page.data.slices) {
    if (slice.slice_type === "rich_text") {
      const content = (slice as { primary: { content: prismic.RichTextField } }).primary.content;
      for (const block of content ?? []) {
        if (block.type === "heading2" || block.type === "heading3") {
          const text = "text" in block ? (block.text as string) : "";
          headings.push({
            id: text.toLowerCase().replace(/\s+/g, "-"),
            text,
            level: block.type === "heading2" ? 2 : 3,
          });
        }
      }
    }
  }

  // Build prev/next from docs in same category
  const currentIndex = allDocs.findIndex((d) => d.uid === uid);
  const prevDoc = currentIndex > 0 ? allDocs[currentIndex - 1] : null;
  const nextDoc = currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : null;

  return (
    <div className="flex min-h-screen pt-16">
      <Sidebar sections={sidebarSections} />

      <main className="flex-1 md:ml-72 lg:mr-72 px-6 py-12 lg:px-16">
        <div className="max-w-3xl mx-auto">
          <BreadcrumbBar
            items={[
              { label: categoryLabel, href: `/${category}` },
              { label: page.data.breadcrumb_label || page.data.title || uid },
            ]}
            badge={page.data.badge_label ?? undefined}
            badgeVariant={
              page.data.badge_label === "Required" ? "tertiary" : "secondary"
            }
            readingTime={page.data.reading_time ?? undefined}
          />

          <div className="mb-12">
            <h1 className="text-5xl font-black font-headline text-on-surface mb-6 tracking-tight leading-none">
              {page.data.title}
            </h1>
          </div>

          <SliceZone slices={page.data.slices} />

          <PaginationFooter
            prev={
              prevDoc
                ? {
                    label: prevDoc.data.title ?? prevDoc.uid,
                    href: `/${category}/${prevDoc.uid}`,
                  }
                : undefined
            }
            next={
              nextDoc
                ? {
                    label: nextDoc.data.title ?? nextDoc.uid,
                    href: `/${category}/${nextDoc.uid}`,
                  }
                : undefined
            }
          />
        </div>
      </main>

      <TableOfContents headings={headings} />
    </div>
  );
}
