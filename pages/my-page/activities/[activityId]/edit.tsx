import ActivityEditForm from "@/Components/ActivityEdit/ActivityEditForm";
import { auth } from "@/apis/auth/auth";
import { activity } from "@/apis/myActivities/myActivites";
import { Activities } from "@/apis/myActivities/myActivities.type";
import { useActivitiesDetailCheck } from "@/service/activities/useActivitiesService";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { req, query } = context;
  const { cookies } = req;
  const { accessToken } = cookies;

  // token이 없으면 홈페이지로 리다이렉트
  if (!accessToken) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const { activityId }: { activityId?: string } = query;
  const currentActivityId = activityId;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["activities", currentActivityId], () =>
    activity.detail(currentActivityId),
  );

  const { data: userData } = await auth.getUser();
  const loginId = userData?.id;

  if (!userData || userData.id !== loginId) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const ActivityEdit = () => {
  const router = useRouter();
  const { activityId } = router.query;
  const id = Number(activityId);

  const { data, error, isLoading } = useQuery(
    ["activities", activityId],
    () => activity.detail(activityId),
    {
      onSuccess: (data) => {
        console.log("Fetched activity details:", data);
      },
      onError: (error) => {
        console.error("Error fetching activity details:", error);
      },
    },
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <ActivityEditForm activityId={id} initialData={data} />
    </>
  );
};

export default ActivityEdit;
