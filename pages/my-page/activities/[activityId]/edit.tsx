import ActivityEditForm from "@/Components/ActivityEdit/ActivityEditForm";
import { auth } from "@/apis/auth/auth";
import { activity } from "@/apis/myActivities/myActivites";
import { Activities } from "@/apis/myActivities/myActivities.type";
import { useActivitiesDetailCheck } from "@/service/activities/useActivitiesService";
import { QueryClient, useQueries, useQuery } from "@tanstack/react-query";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { req } = context;
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

  const { query } = context;
  const { activityId }: { activityId?: string } = query;
  console.log(activityId);

  const currentActivityId = activityId;

  const { data } = useQuery({
    queryFn: (data:string) => activity.detail(data),
    queryKey: ["activities", currentActivityId],
    },
    
    
  });
  const { data: userData } = await auth.getUser();
  const loginId = userData?.id;
  console.log(userId, loginId);

  if (userId !== loginId) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const ActivityEdit = () => {
  const router = useRouter();
  const { activityId } = router.query;
  const id = Number(activityId);

  return (
    <>
      <ActivityEditForm activityId={id} />
    </>
  );
};

export default ActivityEdit;
