import axios, { Axios, AxiosError, ResponseType } from "axios";
import { instance } from "../apis";
import { DataType } from "./activityDetails.type";
import { ReviewData } from "./activityDetails.type";
import { AvailableSchedule } from "./activityDetails.type";
import { requestor } from "@/service/requestor";

const BASE_URL = "https://sp-globalnomad-api.vercel.app/4-17";

// 체험 상세 조회
export async function getDatas(activityId: number): Promise<DataType> {
  const response = await fetch(`${BASE_URL}/activities/${activityId}`);
  return await response.json();
}

export const getActivityDetails = async (activityId: number) => {
  const response = await requestor.get(`/activities/${activityId}`);
  const ActivityDetailsData = response.data;
  return ActivityDetailsData;
};

//체험 예약 가능일 조회
export async function getAvailableSchedule(
  year: number,
  month: number,
  activityId: number,
): Promise<AvailableSchedule> {
  const response = await fetch(
    `${BASE_URL}/activities/${activityId}/available-schedule`,
  );
  return await response.json();
}

export const getSchedule = async (
  year: string,
  month: string,
  activityId: number,
): Promise<AvailableSchedule[]> => {
  const response = await requestor.get(
    `/activities/${activityId}/available-schedule`,
    {
      params: {
        year: year,
        month: month,
      },
    },
  );
  const schedule = response.data;
  return schedule;
};

//체험 리뷰 조회
export async function getReviews(
  activityId: number,
  page: number,
  size: number,
): Promise<ReviewData> {
  const params = new URLSearchParams({
    activityId: activityId.toString(),
    page: page.toString(),
    size: size.toString(),
  });
  const response = await fetch(
    `${BASE_URL}/activities/${activityId}/reviews?${params}`,
  );
  return await response.json();
}

//체험 예약 신청
export const ReservationRequest = async (
  data: { scheduleId: number; headCount: number },
  activityId: number,
) => {
  const response = await requestor.post(
    `activities/${activityId}/reservations`,
    data,
  );
  const result = response.data;
  return result;
};
