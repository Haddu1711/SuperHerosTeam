import { SuperHeroAppearance } from "@/types/heros/super-hero";
import { DetailedRow } from "./detailed-row";

export function HeroAppearance({
  appearance,
}: {
  appearance: SuperHeroAppearance;
}) {
  return (
    <section className="space-y-2">
      <h2 className="text-lg font-semibold">Appearance</h2>

      <DetailedRow label="Gender" value={appearance.gender} />
      <DetailedRow label="Race" value={appearance.race} />
      <DetailedRow label="Height" value={appearance.height} />
      <DetailedRow label="Weight" value={appearance.weight} />
      <DetailedRow label="Eye Color" value={appearance["eye-color"]} />
      <DetailedRow label="Hair Color" value={appearance["hair-color"]} />
    </section>
  );
}
