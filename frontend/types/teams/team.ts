import { SuperHero } from "../heros/super-hero";

export type TeamMemberList = {
  hero: {
    id: number;
    name: string;
    image_url?: string | null;
    slug: string;
  };
};

export type TeamStrength = "strong" | "average" | "weak";
export type TeamStatus = "draft" | "approved" | "rejected";

export type RecommendedTeam = {
  id: number;
  name: string;
  description?: string;
  team_type: string;
  team_strength: TeamStrength;
  status: TeamStatus;
  is_public: boolean;
  score: number;
  members: TeamMemberList[];
  created_at: string;
  explanation?: string;
};

export type RecommendedTeamListData = {
  count: number;
  next: string | null;
  previous: string | null;
  results: RecommendedTeam[];
};

export type TeamDetailDataType = Omit<RecommendedTeam, "members"> & {
  members: { hero: SuperHero }[];
};

export type TeamUpdatePayload = {
  action: TeamStatus;
  name?: string;
  description?: string;
  explanation?: string;
};
