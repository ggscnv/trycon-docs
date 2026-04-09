interface GlowChipProps {
  label: string;
  variant?: "primary" | "secondary" | "tertiary";
  pulse?: boolean;
}

const variantClasses = {
  primary: "bg-[#e8f2fb] text-[#2677BD] border-[#b8d6f0]",
  secondary: "bg-[#eeeeff] text-[#6766DF] border-[#c5c4f8]",
  tertiary: "bg-[#faeae8] text-[#C0392B] border-[#f0c0bc]",
};

export default function GlowChip({ label, variant = "secondary", pulse = false }: GlowChipProps) {
  return (
    <span
      className={`border px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase ${variantClasses[variant]} ${
        pulse ? "animate-pulse" : ""
      }`}
    >
      {label}
    </span>
  );
}
