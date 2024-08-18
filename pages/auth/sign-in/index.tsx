import React from "react";
import LoginInput from "@/Components/Input/LoginInput";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { USER_INPUT_VALIDATION } from "@/constants/user";
import EmptyLayout from "@/layouts/EmptyLayout";
import HeadMeta from "@/Components/Common/HeadMeta";
import { META_TAG } from "@/constants/metaTag";
import { FormValues } from "@/apis/auth/auth.type";
import { useRouter } from "next/router";

const { email, password } = USER_INPUT_VALIDATION;

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
};

const SignIn = () => {
  const { formState, register, handleSubmit } = useForm({
    defaultValues: { email: "", password: "" },
    mode: "onBlur",
  });

  const router = useRouter();

  const { isValid, errors } = formState;

  const onSubmit = async (data: FormValues) => {
    const { email, password } = data;

    const res = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });

    if (res?.error) {
      alert("로그인에 실패했습니다.");
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <HeadMeta
        title={META_TAG.signIn["title"]}
        description={META_TAG.signIn["description"]}
      />
      <div className="flex items-center justify-center">
        <div className="flex w-loginForm flex-col items-center pt-24">
          <div>
            <Link href="/">
              <img
                src="/icons/logo.svg"
                alt="글로벌노마드 로고 이미지"
                className="mobile:w-loginLogo"
              />
            </Link>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-10 flex w-full flex-col gap-7 mobile:min-w-80 mobile:px-3"
          >
            <LoginInput
              label="이메일"
              type="email"
              placeholder="이메일을 입력해 주세요"
              isError={!!errors.email}
              errorMessage={errors.email?.message}
              {...register("email", rules.emailRules)}
            />
            <LoginInput
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              isError={!!errors.password}
              errorMessage={errors.password?.message}
              {...register("password", rules.passwordRules)}
            />
            <button
              type="submit"
              disabled={!isValid}
              className={`h-12 rounded-md text-base font-bold text-white ${
                isValid ? "bg-gnDarkGreen" : "bg-gray-400"
              }`}
            >
              로그인 하기
            </button>
          </form>
          <div className="mt-8 flex gap-2 text-base font-normal text-gnGray800">
            <p>회원이 아니신가요?</p>
            <Link
              href="/auth/sign-up"
              className="text-base font-normal text-gnDarkGreen underline"
            >
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;

SignIn.getLayout = function getLayout(page: React.ReactNode) {
  return <EmptyLayout>{page}</EmptyLayout>;
};
