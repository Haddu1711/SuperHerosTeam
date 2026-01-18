import { SuperHeroWork } from "@/types/heros/super-hero";
import { DetailedRow } from "./detailed-row";

export function HeroWork({ work }: { work: SuperHeroWork }) {
  return (
    <section className="space-y-2">
      <h2 className="text-lg font-semibold">Work</h2>

      <DetailedRow label="Occupation" value={work.occupation} />
      <DetailedRow label="Base" value={work.base} />
    </section>
  );
}
