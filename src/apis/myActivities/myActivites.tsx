import { requestor } from "@/service/requestor";
import { instance } from "../apis";
import {
  Activities,
  GetMyActivitiesParam,
  GetMyActivitiesRes,
} from "./myActivities.type";

export const getMyActivities = async ({
  cursorId,
  size,
}: GetMyActivitiesParam) => {
  const cursorParam = cursorId ? `&cursorId=${cursorId}` : "";

  return await instance.get<GetMyActivitiesRes>(
    `/my-activities?size=${size}${cursorParam}`,
  );
};

export const activity = {
  detail: async (activitiesId: string) => {
    const response = await requestor.get(`/activities/${activitiesId}`);
    return response.data;
  },
};
