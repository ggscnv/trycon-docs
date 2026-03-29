interface Card {
  icon: string;
  title: string;
  description: string;
  iconColor?: "primary" | "secondary" | "tertiary";
}

const iconColorMap = {
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary",
};

interface CardGridProps {
  slice: {
    items: Card[];
  };
}

export default function CardGrid({ slice }: CardGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {slice.items.map((card, i) => (
        <div
          key={i}
          className="bg-surface-container-low p-6 rounded-2xl hover:bg-surface-container-high hover:border hover:border-primary/20 transition-all group cursor-default"
        >
          <span
            className={`material-symbols-outlined ${iconColorMap[card.iconColor || "primary"]} mb-4 block group-hover:scale-110 transition-transform`}
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {card.icon}
          </span>
          <h5 className="font-bold text-zinc-200 mb-2">{card.title}</h5>
          <p className="text-xs text-zinc-500">{card.description}</p>
        </div>
      ))}
    </div>
  );
}
