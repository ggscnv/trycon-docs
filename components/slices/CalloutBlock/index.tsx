type CalloutVariant = "warning" | "info" | "success";

const variantConfig = {
  warning: {
    bg: "bg-tertiary-container/10",
    border: "border-tertiary/20",
    icon: "warning",
    iconColor: "text-tertiary",
    titleColor: "text-tertiary",
  },
  info: {
    bg: "bg-primary-container/10",
    border: "border-primary/20",
    icon: "info",
    iconColor: "text-primary",
    titleColor: "text-primary",
  },
  success: {
    bg: "bg-secondary-container/10",
    border: "border-secondary/20",
    icon: "check_circle",
    iconColor: "text-secondary",
    titleColor: "text-secondary",
  },
};

interface CalloutBlockProps {
  slice: {
    primary: {
      variant: CalloutVariant;
      title: string;
      body: string;
    };
  };
}

export default function CalloutBlock({ slice }: CalloutBlockProps) {
  const config = variantConfig[slice.primary.variant] || variantConfig.info;
  return (
    <div className={`${config.bg} border ${config.border} p-6 rounded-2xl flex gap-4 mb-8`}>
      <span className={`material-symbols-outlined ${config.iconColor} flex-shrink-0`}>
        {config.icon}
      </span>
      <div className="text-sm">
        <p className={`font-bold ${config.titleColor} mb-1`}>{slice.primary.title}</p>
        <p className="text-zinc-400">{slice.primary.body}</p>
      </div>
    </div>
  );
}
