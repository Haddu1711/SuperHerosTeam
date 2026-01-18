export type PowerStatsType = {
  intelligence: number;
  strength: number;
  speed: number;
  durability: number;
  power: number;
  combat: number;
};

export type SuperHeroBioGraphy = {
  aliases: string[] | null;
  alignment: string | null;
  "full-name": string | null;
  publisher: string | null;
  "alter-egos": string | null;
  "place-of-birth": string | null;
  "first-appearance": string | null;
};

export type SuperHeroAppearance = {
  race: string | null;
  gender: string | null;
  height: string[] | null;
  weight: string[] | null;
  "eye-color": string | null;
  "hair-color": string | null;
};

export type SuperHeroWork = {
  base: string | null;
  occupation: string | null;
};

export type SuperHeroConnections = {
  relatives: string | null;
  "group-affiliation": string | null;
};

export type SuperHeroDetailsType = {
  biography: SuperHeroBioGraphy;
  appearance: SuperHeroAppearance;
  work: SuperHeroWork;
  connections: SuperHeroConnections;
};

export type SuperHero = {
  id: number;
  name: string;
  slug: string;
  alignment: string;
  publisher?: string;
  image_url?: string;
} & PowerStatsType;

export type SuperHeroListData = {
  count: number;
  next: string | null;
  previous: string | null;
  results: SuperHero[];
};

export type SuperHeroDetailDataType = SuperHero &
  SuperHeroDetailsType & {
    is_favorite: boolean | null;
  };
