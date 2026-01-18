import { ApiRoutes } from "@/constants/routes";
import { api } from "../api";
import { ApiError } from "@/types/api";

export const fetchSuperHerosAction = async ({
  page = 1,
}: {
  page?: number;
}) => {
  try {
    const res = await api.get(ApiRoutes.HERO.hero_list, {
      params: {
        page: page,
      },
    });

    return { data: res.data, status: res.status };
  } catch (error) {
    return {
      data: null,
      error: error as ApiError,
    };
  }
};

export const fetchSuperHeroDetailAction = async ({
  slug,
}: {
  slug: string;
}) => {
  try {
    const res = await api.get(ApiRoutes.HERO.heor_detail(slug));

    return { data: res.data, status: res.status };
  } catch (error) {
    return {
      data: null,
      error: error as ApiError,
    };
  }
};
