interface GlowChipProps {
  label: string;
  variant?: "primary" | "secondary" | "tertiary";
  pulse?: boolean;
}

const variantClasses = {
  primary: "bg-primary/10 text-primary border-primary/30 shadow-[0_0_4px_rgba(208,188,255,0.4)]",
  secondary: "bg-secondary/10 text-secondary border-secondary/30 shadow-[0_0_4px_rgba(78,222,163,0.4)]",
  tertiary: "bg-tertiary/10 text-tertiary border-tertiary/30 shadow-[0_0_4px_rgba(255,185,95,0.4)]",
};

export default function GlowChip({ label, variant = "secondary", pulse = false }: GlowChipProps) {
  return (
    <span
      className={`border px-2 py-0.5 rounded-full text-xs font-bold tracking-widest uppercase ${variantClasses[variant]} ${
        pulse ? "animate-pulse" : ""
      }`}
    >
      {label}
    </span>
  );
}
