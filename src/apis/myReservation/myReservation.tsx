import { instance } from "../apis";
import {
  GetMyReservationsParam,
  GetMyReservationsRes,
} from "./myReservation.type";

export const getMyReservations = async ({
  cursorId,
  size,
  status,
}: GetMyReservationsParam) => {
  const cursorParam = cursorId ? `&cursorId=${cursorId}` : "";
  const statusParam = status ? `&status=${status}` : "";

  return await instance.get<GetMyReservationsRes>(
    `/my-reservations?${cursorParam}&size=${size}${statusParam}`,
  );
};
