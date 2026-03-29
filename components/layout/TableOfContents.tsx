"use client";
import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  return (
    <aside className="hidden lg:block w-72 h-[calc(100vh-64px)] fixed right-0 top-16 py-12 px-8 overflow-y-auto no-scrollbar">
      <p className="text-[10px] font-bold tracking-widest text-zinc-500 mb-6 uppercase">On this page</p>
      <nav className="space-y-4">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={`block text-xs font-medium transition-colors ${
              heading.level === 3 ? "pl-4" : ""
            } ${
              activeId === heading.id
                ? "text-primary"
                : "text-zinc-500 hover:text-zinc-200"
            }`}
          >
            {heading.text}
          </a>
        ))}
      </nav>

      <div className="mt-12 pt-12 border-t border-outline-variant/10">
        <button className="w-full py-2.5 px-4 bg-primary-container text-on-primary-container text-xs font-bold rounded-full shadow-[0_0_12px_rgba(139,92,246,0.2)] hover:shadow-[0_0_18px_rgba(139,92,246,0.35)] transition-all">
          Give Feedback
        </button>
        <button className="w-full mt-3 py-2.5 px-4 bg-surface-container-high text-on-surface text-xs font-bold rounded-full hover:bg-surface-container-highest transition-all">
          Edit this page
        </button>
      </div>
    </aside>
  );
}
