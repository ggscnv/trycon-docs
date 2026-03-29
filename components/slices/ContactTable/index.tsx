interface Contact {
  name: string;
  area: string;
  slack: string;
}

interface ContactTableProps {
  slice: {
    items: Contact[];
  };
}

export default function ContactTable({ slice }: ContactTableProps) {
  return (
    <div className="overflow-x-auto mb-8">
      <table className="w-full text-left text-sm">
        <thead className="text-zinc-500 font-medium border-b border-outline-variant/10">
          <tr>
            <th className="pb-4 pr-4">Point of Contact</th>
            <th className="pb-4 pr-4">Area</th>
            <th className="pb-4">Slack Channel</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/10">
          {slice.items.map((contact, i) => {
            const initials = contact.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2);
            return (
              <tr key={i}>
                <td className="py-4 pr-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] text-zinc-400 font-bold flex-shrink-0">
                      {initials}
                    </div>
                    <span className="font-medium">{contact.name}</span>
                  </div>
                </td>
                <td className="py-4 pr-4 text-zinc-400">{contact.area}</td>
                <td className="py-4 font-mono text-primary">{contact.slack}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
