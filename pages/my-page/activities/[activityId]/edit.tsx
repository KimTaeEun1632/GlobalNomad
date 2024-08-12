import ActivityEditForm from "@/Components/ActivityEdit/ActivityEditForm";
import ActivityEditFormSkeleton from "@/Components/ActivityEdit/ActivityEditFormSkeleton";
import { requestor } from "@/service/requestor";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
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
  const session = useSession();
  const router = useRouter();
  const loginId = session.data?.user?.id;

  const { data, isLoading } = useQuery({
    queryKey: ["activities", CurrentActivityId],
    queryFn: () => getActivityDetailCheck(CurrentActivityId),
    enabled: !!CurrentActivityId,
  });

  const userId = data?.userId;

  useEffect(() => {
    if (loginId && userId && loginId !== userId) {
      router.push("/");
    }
  }, [loginId, userId, router]);

  if (isLoading || !data) return <ActivityEditFormSkeleton />;

  return (
    <>
      <ActivityEditForm activityData={data} />
    </>
  );
};

export default ActivityEdit;
