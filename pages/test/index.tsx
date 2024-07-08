import ActivityContentSkeleton from "@/Components/ActivityDetails/ActivityContentSkeleton";
import ReviewSkeleton from "@/Components/ActivityDetails/ReviewSkeleton";
import AddressSearch from "@/Components/ActivityRegist/AddressPostcode";

import ReservationList from "@/Components/MyReservation/ReservationList";
import NoReservationList from "@/Components/MyReservation/NoReservationList";
import ReservationFilter from "@/Components/MyReservation/ReservationFilter";
// import { getMyReservations } from "@/apis/myReservation/myReservation";
import {
  GetMyReservationsParam,
  GetMyReservationsRes,
  ReservationStatus,
} from "@/apis/myReservation/myReservation.type";
import {
  useInfiniteQuery,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { GetServerSideProps } from "next";
import MobileDropDown from "@/Components/MyPage/MobileDropDown";
import { ReservationSkeleton } from "@/Components/MyReservation/ReservationSkeleton";
import HeadMeta from "@/Components/Common/HeadMeta";
import { META_TAG } from "@/constants/metaTag";
import { requestor } from "@/service/requestor";

const getMyReservations = async ({
  cursorId,
  size,
  status,
}: GetMyReservationsParam) => {
  const cursorParam = cursorId ? `&cursorId=${cursorId}` : "";
  const statusParam = status ? `&status=${status}` : "";
  console.log(size, cursorParam, statusParam);

  const { data } = await requestor.get(
    `/my-reservations?size=${size}${cursorParam}${statusParam}`,
  );
  console.log(data);
  return data;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  const response = await queryClient.prefetchInfiniteQuery({
    queryKey: ["MyReservations", "all"],
    queryFn: ({ pageParam = 0 }) => {
      const status = "all";
      return getMyReservations({ size: 6, status, cursorId: pageParam });
    },
    initialPageParam: 0,
  });
  console.log(response);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
const test = () => {
  return (
    <>
      <AddressSearch />
    </>
  );
};

export default test;
