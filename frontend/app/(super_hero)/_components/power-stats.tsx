import { type PowerStatsType } from "@/types/heros/super-hero";

export function PowerStats({
  intelligence,
  strength,
  speed,
  durability,
  power,
  combat,
}: PowerStatsType) {
  const stats = [
    { key: "INT", value: intelligence, label: "Intelligence" },
    { key: "STR", value: strength, label: "Strength" },
    { key: "SPD", value: speed, label: "Speed" },
    { key: "DUR", value: durability, label: "Durability" },
    { key: "POW", value: power, label: "Power" },
    { key: "COM", value: combat, label: "Combat" },
  ];

  return (
    <div className="grid grid-cols-3 gap-2 text-xs mt-2">
      {stats.map((stat) => (
        <div
          key={stat.key}
          className="flex items-center justify-between rounded border px-2 py-1"
          title={stat.label}
        >
          <span className="text-muted-foreground">{stat.key}</span>
          <span className="font-semibold">{stat.value}</span>
        </div>
      ))}
    </div>
  );
}
