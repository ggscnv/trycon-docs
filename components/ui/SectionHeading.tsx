interface SectionHeadingProps {
  number: string;
  children: React.ReactNode;
  id?: string;
}

export default function SectionHeading({ number, children, id }: SectionHeadingProps) {
  return (
    <h2
      id={id}
      className="text-2xl font-bold font-headline mb-6 flex items-center gap-3 text-[#111]"
    >
      <span className="w-8 h-8 rounded bg-[#e8f2fb] border border-[#b8d6f0] flex items-center justify-center text-[#2677BD] text-sm flex-shrink-0">
        {number}
      </span>
      {children}
    </h2>
  );
}
