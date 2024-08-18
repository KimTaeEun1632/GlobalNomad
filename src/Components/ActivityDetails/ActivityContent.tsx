import ActivityInfo from "./ActivityInfo";
import ActivityOverview from "./ActivityOverview";
import ReservationBox from "./ReservationBox";
import { useQuery } from "@tanstack/react-query";
import { getDatas } from "@/apis/activityDetails/activityDetails";
import { DataType } from "@/apis/activityDetails/activityDetails.type";
import ActivityContentSkeleton from "./ActivityContentSkeleton";

interface ActivityContentProps {
  activityId: number;
}

const ActivityContent = ({ activityId }: ActivityContentProps) => {
  const { data, isLoading } = useQuery<DataType>({
    queryKey: ["ActivityData", activityId],
    queryFn: () => getDatas(activityId),
  });

  if (isLoading) return <ActivityContentSkeleton />;

  if (!data) return null;

  return (
    <div className="flex flex-col items-center">
      {data && (
        <>
          <ActivityOverview
            userId={data.userId}
            activityId={activityId}
            title={data.title}
            category={data.category}
            address={data.address}
            rating={data.rating}
            reviewCount={data.reviewCount}
            bannerImageUrl={data.bannerImageUrl}
            subImages={data.subImages}
          />
          <div className="flex items-center gap-6 mobile:flex-col">
            <ActivityInfo
              description={data.description}
              address={data.address}
            />
            <ReservationBox
              activityId={activityId}
              price={data.price}
              schedule={data.schedules}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ActivityContent;
