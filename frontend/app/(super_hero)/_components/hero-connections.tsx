import { SuperHeroConnections } from "@/types/heros/super-hero";
import { DetailedRow } from "./detailed-row";

export function HeroConnections({
  connections,
}: {
  connections: SuperHeroConnections;
}) {
  return (
    <section className="space-y-2">
      <h2 className="text-lg font-semibold">Connections</h2>

      <DetailedRow
        label="Group Affiliation"
        value={connections["group-affiliation"]}
      />
      <DetailedRow label="Relatives" value={connections.relatives} />
    </section>
  );
}
