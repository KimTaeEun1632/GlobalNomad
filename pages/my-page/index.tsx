import LoginInput from "@/Components/Input/LoginInput";
import { USER_INPUT_VALIDATION } from "@/constants/user";
import { useForm } from "react-hook-form";
import { FormValues } from "@/apis/auth/auth.type";
import { useEffect, useState } from "react";
import Toast from "@/Components/Toast/Toast";
import MobileDropDown from "@/Components/MyPage/MobileDropDown";
import HeadMeta from "@/Components/Common/HeadMeta";
import { META_TAG } from "@/constants/metaTag";
import MobileImageChange from "@/Components/MyPage/MobileImageChange";
import MyPageSkeleton from "@/Components/MyPage/MyPageSkeleton";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { patchUserInfo } from "@/apis/user/user";
import { PatchUserDataReq, PatchUserDataRes } from "@/apis/user/user.type";
import { id } from "date-fns/locale";
import ImageInput from "@/Components/Input/ImageInput";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const sessionData = await getSession(context);

  const userData = {
    email: sessionData?.user?.email || null,
    nickname: sessionData?.user?.name || null,
    profileImageUrl: sessionData?.user?.image || null,
  };
  console.log("유저데이타", userData);
  return {
    props: { userData },
  };
};

interface MyPageProps {
  userData: getMyData;
}

interface getMyData {
  email: string;
  id: number;
  nickname: string;
  profileImageUrl: string;
}

const { email, password, nickname, passwordConfirm } = USER_INPUT_VALIDATION;

const rules = {
  emailRules: {
    required: email.errorMessage.empty,
    pattern: {
      value: email.regex,
      message: email.errorMessage.invalid,
    },
  },
  passwordRules: {
    required: password.errorMessage.empty,
    pattern: {
      value: password.regex,
      message: password.errorMessage.invalid,
    },
    minLength: {
      value: 8,
      message: password.errorMessage.minLength,
    },
    maxLength: {
      value: 16,
      message: password.errorMessage.maxLength,
    },
  },
  nicknameRules: {
    required: nickname.errorMessage.empty,
    pattern: {
      value: nickname.regex,
      message: nickname.errorMessage.invalid,
    },
  },
  passwordConfirm: {
    required: passwordConfirm.errorMessage.confirm,
  },
};

const MyPage = ({ userData }: MyPageProps) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isValid, errors },
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      nickname: userData.nickname,
      email: userData.email,
      profileImageUrl: userData.profileImageUrl, // Add this line
    },
  });

  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const { update } = useSession();

  const onSubmit = (formData: FormValues) => {
    const profileImageUrl = getValues("profileImageUrl");
    console.log(profileImageUrl);
    const data = {
      nickname: formData.nickname || "",
      newPassword: formData.password || "",
      profileImageUrl: profileImageUrl || "",
    };

    patchUserInfoMutation.mutate(data);
  };

  const patchUserInfoMutation = useMutation({
    mutationFn: (data: PatchUserDataReq) => patchUserInfo(data),
    onSuccess: (data: PatchUserDataRes) => {
      update({
        name: data.nickname,
        image: data.profileImageUrl,
      });
      setToastMessage("정보가 성공적으로 수정되었습니다.");
      setShowToast(true);
    },
    onError: (error) => {
      console.error("에러 발생:", error);
      setToastMessage("정보 수정에 실패했습니다.");
      setShowToast(true);
    },
  });

  return (
    <>
      <HeadMeta title={META_TAG.myPage["title"]} />
      <div className="w-myInfoBoxWidth tablet:w-[30.75rem] mobile:w-[21.438rem]">
        <form
          className="flex flex-col gap-6 tablet:gap-4 mobile:gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex justify-between">
            <div className="flex">
              <h1 className="text-3xl font-bold">내 정보</h1>
              <MobileDropDown />
            </div>
            <button
              type="submit"
              disabled={!isValid}
              className="flex cursor-pointer flex-col items-end gap-6 rounded-md bg-gnDarkGreen px-4 py-2 font-bold leading-6 text-white active:bg-green-950"
            >
              저장하기
            </button>
          </div>
          <MobileImageChange
            profileImageUrl={userData.profileImageUrl}
            handleChangeImage={() => {}}
          />
          <div className="flex flex-col gap-4">
            <ImageInput
              profileImageUrl={userData.profileImageUrl}
              name="profileImageUrl"
            />
            <LoginInput
              label="닉네임"
              type="text"
              placeholder={userData.nickname}
              isError={!!errors.nickname}
              errorMessage={errors.nickname?.message}
              {...register("nickname", rules.nicknameRules)}
            />
            <LoginInput
              label="이메일"
              type="email"
              placeholder={userData.email}
              isError={!!errors.email}
              errorMessage={errors.email?.message}
              {...register("email", rules.emailRules)}
              disabled={true}
            />
            <LoginInput
              label="비밀번호"
              type="password"
              placeholder="8자 이상 입력해 주세요"
              isError={!!errors.password}
              errorMessage={errors.password?.message}
              {...register("password", rules.passwordRules)}
            />
            <LoginInput
              label="비밀번호 확인"
              type="password"
              placeholder="비밀번호를 한번 더 입력해 주세요"
              isError={!!errors.passwordConfirm}
              errorMessage={errors.passwordConfirm?.message}
              {...register("passwordConfirm", {
                validate: {
                  notMatch: (value) => {
                    const { password } = getValues();
                    return (
                      password === value ||
                      passwordConfirm?.errorMessage.confirm
                    );
                  },
                },
              })}
            />
          </div>
        </form>
      </div>
      {showToast && (
        <Toast onShow={() => setShowToast(false)}>{toastMessage}</Toast>
      )}
    </>
  );
};

export default MyPage;
