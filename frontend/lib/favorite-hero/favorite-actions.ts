import { ApiRoutes } from "@/constants/routes";
import { api } from "../api";
import { ApiError } from "@/types/api";

export const setFavHeroUserAction = async ({ heroId }: { heroId: number }) => {
  try {
    const res = await api.post(ApiRoutes.FAV.fav_action(heroId));

    return { data: res.data, status: res.status };
  } catch (error) {
    return {
      data: null,
      error: error as ApiError,
    };
  }
};

export const getFavHeroUserAction = async ({ heroId }: { heroId: number }) => {
  try {
    const res = await api.get(ApiRoutes.FAV.fav_action(heroId));

    return { data: res.data, status: res.status };
  } catch (error) {
    return {
      data: null,
      error: error as ApiError,
    };
  }
};

export const removeFavHeroUserAction = async ({
  heroId,
}: {
  heroId: number;
}) => {
  try {
    const res = await api.delete(ApiRoutes.FAV.fav_action(heroId));

    return { data: res.data, status: res.status };
  } catch (error) {
    return {
      data: null,
      error: error as ApiError,
    };
  }
};
