interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  slice: {
    items: FaqItem[];
  };
}

export default function FaqAccordion({ slice }: FaqAccordionProps) {
  return (
    <div className="space-y-4 mb-8">
      {slice.items.map((item, i) => (
        <details
          key={i}
          className="group bg-surface-container-low rounded-xl border border-outline-variant/10 overflow-hidden"
        >
          <summary className="p-4 cursor-pointer flex justify-between items-center list-none hover:bg-white/5 transition-all">
            <span className="font-medium text-zinc-200">{item.question}</span>
            <span className="material-symbols-outlined text-zinc-500 group-open:rotate-180 transition-transform flex-shrink-0">
              expand_more
            </span>
          </summary>
          <div className="p-4 pt-0 text-sm text-zinc-400 border-t border-outline-variant/5">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
