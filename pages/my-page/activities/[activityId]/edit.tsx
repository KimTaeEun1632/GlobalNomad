import ActivityEditForm from "@/Components/ActivityEdit/ActivityEditForm";
import ActivityEditFormSkeleton from "@/Components/ActivityEdit/ActivityEditFormSkeleton";
import { useAuth } from "@/context/Authcontext";
import { requestor } from "@/service/requestor";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const getActivityDetailCheck = async (activityId: number) => {
  const response = await requestor.get(`/activities/${activityId}`);
  const detailData = response.data;
  return detailData;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { query } = context;

  const queryClient = new QueryClient();

  const activityId = query["activityId"];
  const CurrentActivityId = Number(activityId);

  await queryClient.prefetchQuery({
    queryKey: ["activities", CurrentActivityId],
    queryFn: () => getActivityDetailCheck(CurrentActivityId),
  });

  return {
    props: { dehydratedState: dehydrate(queryClient), CurrentActivityId },
  };
};

const ActivityEdit = ({ CurrentActivityId }: { CurrentActivityId: number }) => {
  const { user } = useAuth();
  const router = useRouter();
  const loginId = user?.user.id;

  const { data, isLoading } = useQuery({
    queryKey: ["activities", CurrentActivityId],
    queryFn: () => getActivityDetailCheck(CurrentActivityId),
    enabled: !!CurrentActivityId,
  });

  const userId = data?.userId;

  useEffect(() => {
    if (loginId !== userId) {
      router.push("/");
    }
  }, [loginId, userId, router]);

  if (isLoading) return <ActivityEditFormSkeleton />;

  return (
    <>
      <ActivityEditForm activityData={data} />
    </>
  );
};

export default ActivityEdit;
