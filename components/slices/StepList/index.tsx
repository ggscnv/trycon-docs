import type { StepListSlice } from "@/prismicio-types";

export default function StepList({ slice }: { slice: StepListSlice }) {
  return (
    <div className="space-y-6 mb-8">
      {slice.items.map((step, i) => (
        <div key={i} className="flex gap-4 items-start relative">
          {i < slice.items.length - 1 && (
            <div className="absolute left-3 top-8 w-px h-full bg-outline-variant/20" />
          )}
          <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center border border-primary/20 z-10">
            {i + 1}
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-zinc-200 mb-1">{step.title}</h4>
            <p className="text-sm text-zinc-500 mb-3">{step.body}</p>
            {step.code && (
              <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10 font-mono text-xs text-secondary-fixed-dim">
                {step.code}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
