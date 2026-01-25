export const paths = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
  },
  HOME: "/",
  HERO: {
    main: "/super-heros",
    heor_detail: (slug: string) => `/super-heros/${slug}`,
  },
  FAV: {
    fav_list: "/super-heros/favorites/",
  },
  TEAMS: {
    recommended: "/teams/recommended/",
    team_detail: (id: number) => `/teams/${id}`,
  },
};

export const ApiRoutes = {
  AUTH: {
    login: "/auth/login/",
    register: "/auth/register/",
    meUser: "/auth/me/",
  },
  HERO: {
    hero_list: "/hero/",
    heor_detail: (slug: string) => `/hero/${slug}/`,
  },
  FAV: {
    fav_list: "/hero/favorites/all/",
    fav_action: (heroId: number) => `/hero/${heroId}/favorite/`,
  },
  RECOMMENDED_TEAM: {
    createRecommendTeams: "/hero/teams/create-recommend/",
    job_status: (jobId: number) => `/hero/teams/recommend/status/${jobId}/`,
    teamList: "/hero/teams/all/",
    teamDetail: (id: number) => `/hero/teams/detail/${id}/`,
    teamUpdateDetail: (id: number) => `/hero/teams/${id}/update/`,
  },
};
