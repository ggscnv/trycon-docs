import { PrismicRichText } from "@prismicio/react";
import type { RichTextSlice } from "@/prismicio-types";

// Extract anchor ID from {#anchor} syntax, or derive from text
function extractAnchorId(text: string): string {
  const match = text.match(/\{#([^}]+)\}/);
  return match ? match[1] : text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
}

// Strip {#...} suffix from heading display text
function cleanHeadingText(text: string): string {
  return text.replace(/\s*\{#[^}]+\}/, "").trim();
}

export default function RichText({ slice }: { slice: RichTextSlice }) {
  return (
    <div className="mb-8">
      <PrismicRichText
        field={slice.primary.content}
        components={{
          heading1: ({ node }) => (
            <h2 id={extractAnchorId(node.text)} className="font-headline text-2xl font-bold text-[#111] mt-10 mb-4">
              {cleanHeadingText(node.text)}
            </h2>
          ),
          heading2: ({ node }) => (
            <h3 id={extractAnchorId(node.text)} className="font-headline text-lg font-semibold text-[#5a5a68] mt-7 mb-3">
              {cleanHeadingText(node.text)}
            </h3>
          ),
          heading3: ({ node }) => (
            <h4 id={extractAnchorId(node.text)} className="font-headline text-base font-semibold text-[#5a5a68] mt-5 mb-2">
              {cleanHeadingText(node.text)}
            </h4>
          ),
          paragraph: ({ children }) => (
            <p className="font-body text-sm text-[#5a5a68] leading-relaxed mb-4">{children}</p>
          ),
          hyperlink: ({ children, node }) => (
            <a href={(node.data as { url: string }).url} className="text-[#2677BD] hover:underline">
              {children}
            </a>
          ),
          list: ({ children }) => (
            <ul className="space-y-2 text-sm text-[#5a5a68] list-disc list-inside mb-4">{children}</ul>
          ),
          oList: ({ children }) => (
            <ol className="space-y-2 text-sm text-[#5a5a68] list-decimal list-inside mb-4">{children}</ol>
          ),
          listItem: ({ children }) => <li>{children}</li>,
          oListItem: ({ children }) => <li>{children}</li>,
          preformatted: ({ children }) => (
            <pre className="bg-[#f7f7f8] border border-[#e2e2e6] rounded-xl p-4 font-mono text-xs text-[#6766DF] overflow-x-auto mb-4">
              {children}
            </pre>
          ),
          strong: ({ children }) => <strong className="font-bold text-[#111]">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
        }}
      />
    </div>
  );
}
