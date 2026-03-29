import { PrismicRichText } from "@prismicio/react";

type RichTextSlice = {
  slice_type: "rich_text";
  primary: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content: any;
  };
  items: never[];
  id: string;
  slice_label: null;
  variation: "default";
  version: string;
};

export default function RichText({ slice }: { slice: RichTextSlice }) {
  return (
    <div className="prose-custom mb-8">
      <PrismicRichText
        field={slice.primary.content}
        components={{
          heading1: ({ children }) => (
            <h1 className="font-headline text-4xl font-black tracking-tight text-on-surface mb-2">
              {children}
            </h1>
          ),
          heading2: ({ children }) => (
            <h2 className="font-headline text-2xl font-bold text-on-surface mt-12 mb-4 flex items-center gap-3">
              {children}
            </h2>
          ),
          heading3: ({ children }) => (
            <h3 className="font-headline text-lg font-semibold text-on-surface-variant mt-8 mb-3">
              {children}
            </h3>
          ),
          paragraph: ({ children }) => (
            <p className="font-body text-sm text-zinc-400 leading-relaxed mb-4">{children}</p>
          ),
          hyperlink: ({ children, node }) => (
            <a href={(node.data as { url: string }).url} className="text-primary hover:underline">
              {children}
            </a>
          ),
          list: ({ children }) => (
            <ul className="space-y-2 text-sm text-zinc-400 list-disc list-inside mb-4">{children}</ul>
          ),
          oList: ({ children }) => (
            <ol className="space-y-2 text-sm text-zinc-400 list-decimal list-inside mb-4">{children}</ol>
          ),
          listItem: ({ children }) => <li>{children}</li>,
          oListItem: ({ children }) => <li>{children}</li>,
          preformatted: ({ children }) => (
            <pre className="bg-surface-container-lowest rounded-xl p-4 font-mono text-xs text-secondary overflow-x-auto mb-4">
              {children}
            </pre>
          ),
          strong: ({ children }) => <strong className="font-bold text-on-surface">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
        }}
      />
    </div>
  );
}
