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
};
