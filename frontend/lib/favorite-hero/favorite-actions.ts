import { getAuthorizationHeaders } from "@/app/actions/auth";
import { ApiRoutes } from "@/constants/routes";
import { ApiError } from "@/types/api";
import { api } from "../api";

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

export const fetchUserFavSuperHeroListAction = async ({
  page = 1,
}: {
  page?: number;
}) => {
  try {
    const headers = await getAuthorizationHeaders();
    const res = await api.get(ApiRoutes.FAV.fav_list, {
      params: {
        page: page,
      },
      headers: { ...headers },
    });

    return { data: res.data, status: res.status };
  } catch (error) {
    return {
      data: null,
      error: error as ApiError,
    };
  }
};
