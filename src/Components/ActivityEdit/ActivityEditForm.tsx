import ActivityEditInfo from "./ActivityEditInfo";
import ActivityEditSchedule from "./ActivityEditSchedule";
import ActivityEditImageUploader from "./ActivityEditImageUploader";
import { useEffect, useState } from "react";
import { ActivitiesDetailCheck } from "@/service/activities/activities.type";
import { useModal } from "@/hooks/useModal";
import { usePatchMyActivities } from "@/service/myActivities/useMyActivitiesService";
import HeadMeta from "../Common/HeadMeta";
import { META_TAG } from "@/constants/metaTag";
import ModalEditAlert from "../Modal/ModalEditAlert";
import axios, { AxiosError } from "axios";

interface ErrorMessage {
  message: string;
}

interface ActivityEditFormProps {
  activityData: ActivitiesDetailCheck;
}

interface newSchedule {
  date: string;
  startTime: string;
  endTime: string;
}

interface FormDataType {
  title: string;
  category: string;
  description: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImageIdsToRemove: number[];
  subImageUrlsToAdd: string[];
  scheduleIdsToRemove: number[];
  schedulesToAdd: newSchedule[];
}

const ActivityEditForm = ({ activityData }: ActivityEditFormProps) => {
  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    category: "",
    description: "",
    price: 0,
    address: "",
    bannerImageUrl: "",
    subImageIdsToRemove: [],
    subImageUrlsToAdd: [],
    scheduleIdsToRemove: [],
    schedulesToAdd: [],
  });
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (activityData) {
      setFormData({
        title: activityData.title || "",
        category: activityData.category || "",
        description: activityData.description || "",
        price: activityData.price || 0,
        address: activityData.address || "",
        bannerImageUrl: activityData.bannerImageUrl || "",
        subImageIdsToRemove: [],
        subImageUrlsToAdd: [],
        scheduleIdsToRemove: [],
        schedulesToAdd: [],
      });
    }
  }, [activityData]);

  const { isOpenModal, handleModalOpen, handleModalClose } = useModal();
  const activityId = activityData.id;
  const { mutate: modify } = usePatchMyActivities(activityId);

  const handleActivityModify = (formData: FormDataType) => {
    modify(formData, {
      onSuccess: () => {
        setModalMessage("수정되었습니다.");
        setIsSuccess(true);
        handleModalOpen();
        console.log("등록 성공!");
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<ErrorMessage>;
          setModalMessage(axiosError.response?.data.message!);
          handleModalOpen();
          console.error("삭제 실패", axiosError);
        } else {
          console.error("삭제 실패 - 일반 에러", error);
        }
      },
    });
  };

  // Info(title, category, description, price, address) 변경 시 formData에 적용하는 함수
  const handleInfoChange = (name: string, value: string | number) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // 새로운 일정을 formData(schedulesToAdd)에 적용하는 함수
  const handleAddSchedule = (newSchedules: newSchedule[]) => {
    setFormData({
      ...formData,
      schedulesToAdd: [...formData.schedulesToAdd, ...newSchedules],
    });
  };

  // (등록되어 있는)기존의 일정 삭제시 formData(scheduleIdsToRemove)에 적용하는 함수
  const handleRemoveSchedule = (ids: number[]) => {
    setFormData({
      ...formData,
      scheduleIdsToRemove: [...formData.scheduleIdsToRemove, ...ids],
    });
  };

  // 새로운 일정들(schedulesToAdd)을 다시 제거할 때 formData에 적용하는 함수
  const handleSchedulesToAdd = (modifiedSchedules: newSchedule[]) => {
    setFormData({
      ...formData,
      schedulesToAdd: [...modifiedSchedules],
    });
  };

  // 배너 이미지 변경
  const handleChangeBannerImage = (imageUrl: string) => {
    setFormData({
      ...formData,
      bannerImageUrl: imageUrl,
    });
  };

  //서브 이미지 변경(추가 및 제거)
  const handleChangeSubImages = (imageUrl: string[]) => {
    setFormData({
      ...formData,
      subImageUrlsToAdd: imageUrl,
    });
  };

  //원래 있던 서브 이미지(디폴트) 제거
  const handleRemoveDefaultSubImages = (ids: number[]) => {
    setFormData({
      ...formData,
      subImageIdsToRemove: ids,
    });
  };

  return (
    <>
      <HeadMeta title={META_TAG.myActivityEdit["title"]} />
      <div className="flex w-[792px] flex-col gap-6 tablet:w-[429px] mobile:w-[343px]">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">내 체험 수정</h1>
          <button
            className="rounded bg-gnLightBlack px-4 py-2 text-base font-bold text-white"
            onClick={() => handleActivityModify(formData)}
          >
            수정하기
          </button>
        </div>
        <ActivityEditInfo
          title={activityData.title}
          description={activityData.description}
          category={activityData.category}
          price={activityData.price}
          address={activityData.address}
          handleFormData={handleInfoChange}
        />
        <ActivityEditSchedule
          schedules={activityData.schedules}
          handleAddSchedule={handleAddSchedule}
          handleRemoveSchedule={handleRemoveSchedule}
          handleSchedulesToAdd={handleSchedulesToAdd}
        />
        <ActivityEditImageUploader
          bannerImageUrl={activityData.bannerImageUrl}
          subImagesUrl={activityData.subImages}
          handleChangeBannerImage={handleChangeBannerImage}
          handleChangeSubImages={handleChangeSubImages}
          handleRemoveDefaultSubImages={handleRemoveDefaultSubImages}
        />
        {isOpenModal && (
          <ModalEditAlert
            isOpenModal={isOpenModal}
            message={modalMessage}
            onClose={handleModalClose}
            isSuccess={isSuccess}
          />
        )}
      </div>
    </>
  );
};

export default ActivityEditForm;
