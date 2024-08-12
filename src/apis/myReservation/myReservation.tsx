import { requestor } from "@/service/requestor";
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

  return await requestor.get<GetMyReservationsRes>(
    `/my-reservations?${cursorParam}&size=${size}${statusParam}`,
  );
};
