export type PowerStatsType = {
  intelligence: number;
  strength: number;
  speed: number;
  durability: number;
  power: number;
  combat: number;
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
