import { SuperHeroBioGraphy } from "@/types/heros/super-hero";
import { DetailedRow } from "./detailed-row";

export function HeroBiography({ bio }: { bio: SuperHeroBioGraphy }) {
  return (
    <section className="space-y-2">
      <h2 className="text-lg font-semibold">Biography</h2>

      <DetailedRow label="Full Name" value={bio["full-name"]} />
      <DetailedRow label="Aliases" value={bio.aliases} />
      <DetailedRow label="Alter Egos" value={bio["alter-egos"]} />
      <DetailedRow label="Place of Birth" value={bio["place-of-birth"]} />
      <DetailedRow label="First Appearance" value={bio["first-appearance"]} />
      <DetailedRow label="Publisher" value={bio.publisher} />
      <DetailedRow label="Alignment" value={bio.alignment} />
    </section>
  );
}
