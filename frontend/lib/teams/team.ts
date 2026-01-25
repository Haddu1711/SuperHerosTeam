import { ApiRoutes } from "@/constants/routes";
import { api } from "../api";
import { ApiError } from "@/types/api";
import { TeamUpdatePayload } from "@/types/teams/team";

export const fetchTeamDetailAction = async ({
  id,
}: {
  id: string | number;
}) => {
  try {
    const res = await api.get(
      ApiRoutes.RECOMMENDED_TEAM.teamDetail(Number(id)),
    );

    return { data: res.data, status: res.status };
  } catch (error) {
    return {
      data: null,
      error: error as ApiError,
    };
  }
};

export const teamUpdateAction = async ({
  id,
  payload,
}: {
  id: string | number;
  payload: TeamUpdatePayload;
}) => {
  try {
    const res = await api.post(
      ApiRoutes.RECOMMENDED_TEAM.teamUpdateDetail(Number(id)),
      payload,
    );

    return { data: res.data, status: res.status };
  } catch (error) {
    return {
      data: null,
      error: error as ApiError,
    };
  }
};
