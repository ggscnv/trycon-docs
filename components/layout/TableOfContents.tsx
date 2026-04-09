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
    <aside className="hidden lg:block w-72 h-[calc(100vh-68px)] fixed right-0 top-[68px] py-10 px-8 overflow-y-auto no-scrollbar bg-white border-l border-[#e2e2e6]">
      <p className="text-[10px] font-semibold tracking-[1px] text-[#9a9aa8] mb-5 uppercase">On this page</p>
      <nav className="space-y-3">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={`block text-xs font-medium transition-colors ${
              heading.level === 3 ? "pl-3" : ""
            } ${
              activeId === heading.id
                ? "text-[#2677BD]"
                : "text-[#9a9aa8] hover:text-[#111]"
            }`}
          >
            {heading.text}
          </a>
        ))}
      </nav>

      <div className="mt-10 pt-8 border-t border-[#e2e2e6]">
        <button className="w-full py-2.5 px-4 bg-[#2677BD] text-white text-xs font-semibold rounded-lg hover:bg-[#1a5a9c] transition-colors">
          Give Feedback
        </button>
        <button className="w-full mt-2.5 py-2.5 px-4 bg-[#f7f7f8] text-[#5a5a68] text-xs font-semibold rounded-lg border border-[#e2e2e6] hover:bg-[#f0f0f2] transition-colors">
          Edit this page
        </button>
      </div>
    </aside>
  );
}
