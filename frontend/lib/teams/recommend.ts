import { ApiRoutes } from "@/constants/routes";
import { api } from "../api";
import { ApiError } from "@/types/api";
import { TeamStatus } from "@/types/teams/team";

export const fetchRecommendedTeams = async ({
  filterStatus,
}: {
  filterStatus?: TeamStatus;
}) => {
  try {
    const params: any = {};
    if (filterStatus) {
      params["status"] = filterStatus;
    }
    const res = await api.get(ApiRoutes.RECOMMENDED_TEAM.teamList, {
      params: params,
    });

    return { data: res.data, status: res.status };
  } catch (error) {
    return {
      data: null,
      error: error as ApiError,
    };
  }
};

export const triggerTeamGeneration = async () => {
  try {
    const res = await api.post(ApiRoutes.RECOMMENDED_TEAM.createRecommendTeams);

    return { data: res.data, status: res.status };
  } catch (error) {
    return {
      data: null,
      error: error as ApiError,
    };
  }
};

export const fetchJobStatus = async (jobId: number) => {
  try {
    const res = await api.get(ApiRoutes.RECOMMENDED_TEAM.job_status(jobId));

    return { data: res.data, status: res.status };
  } catch (error) {
    return {
      data: null,
      error: error as ApiError,
    };
  }
};
