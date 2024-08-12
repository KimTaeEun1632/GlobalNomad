import ActivitySummary from "./ActivitySummary";
import Kebab from "./Kebab";
import { useSession } from "next-auth/react";

interface ActivityOverviewHeaderProops {
  userId: number;
  activityId: number;
  title: string;
  category: string;
  address: string;
  rating: number;
  reviewCount: number;
}

const ActivityOverviewHeader = ({
  userId,
  activityId,
  title,
  category,
  address,
  rating,
  reviewCount,
}: ActivityOverviewHeaderProops) => {
  const session = useSession();

  const loginId = session.data?.user?.id;

  return (
    <div className="my-10 flex items-center justify-between">
      <ActivitySummary
        title={title}
        category={category}
        address={address}
        rating={rating}
        reviewCount={reviewCount}
      />
      {loginId === userId && <Kebab activityId={activityId} />}
    </div>
  );
};

export default ActivityOverviewHeader;
