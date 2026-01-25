import { notFound } from "next/navigation";
import { fetchSuperHeroDetailAction } from "@/lib/heros/super-heros";
import { PowerStats } from "../../_components/power-stats";
import { SuperHeroDetailDataType } from "@/types/heros/super-hero";
import { HeroAppearance } from "../../_components/hero-appearance";
import { HeroBiography } from "../../_components/hero-biography";
import { HeroWork } from "../../_components/hero-work";
import { HeroConnections } from "../../_components/hero-connections";
import { FavoriteButton } from "../../_components/favorite-button";
import Image from "next/image";

const HeroDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  if (!slug) {
    return notFound();
  }

  const res = await fetchSuperHeroDetailAction({ slug });

  const hero: SuperHeroDetailDataType = res.data;

  return (
    <div className="space-y-6">
      <div className="flex gap-6 flex-col lg:flex-row">
        {hero.image_url && (
          <Image
            src={hero.image_url}
            alt={hero.name}
            width={256}
            height={320}
            className="h-80 w-64 rounded-lg object-cover"
          />
        )}

        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold">{hero.name}</h1>

          <p className="text-muted-foreground">
            {hero.publisher ?? "Unknown"} · {hero.alignment}
          </p>

          <FavoriteButton heroId={hero.id} isDefaultFav={hero.is_favorite} />

          <PowerStats {...hero} />
        </div>
      </div>

      <HeroBiography bio={hero.biography} />
      <HeroAppearance appearance={hero.appearance} />
      <HeroWork work={hero.work} />
      <HeroConnections connections={hero.connections} />
    </div>
  );
};

export default HeroDetailPage;
