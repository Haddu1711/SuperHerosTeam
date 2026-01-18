import { paths } from "@/constants/routes";
import { SuperHero } from "@/types/heros/super-hero";
import Link from "next/link";
import { PowerStats } from "./power-stats";

const HeroGridList = ({ heros }: { heros: SuperHero[] }) => {
  if (!heros || heros.length === 0) {
    return (
      <div className="flex justify-center items-center ">
        Opps, No Super Heros Found.
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {heros.map((hero) => (
        <div key={hero.id} className="border rounded-lg p-4">
          {hero.image_url && (
            <img
              src={hero.image_url}
              alt={hero.name}
              className="rounded-md h-60 w-full object-cover"
            />
          )}

          <Link
            href={paths.HERO.heor_detail(hero.slug)}
            className="hover:text-blue-800"
          >
            <h2 className="mt-2 font-semibold">{hero.name}</h2>
          </Link>

          <p className="text-sm text-muted-foreground">
            Publisher: {hero.publisher ?? "Unknown"}
          </p>
          <p className="text-sm text-muted-foreground">
            Alignment: {hero.alignment}
          </p>

          <PowerStats {...hero} />
          <Link
            href={paths.HERO.heor_detail(hero.slug)}
            className="text-sm text-blue-600 underline mt-2 block"
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default HeroGridList;
