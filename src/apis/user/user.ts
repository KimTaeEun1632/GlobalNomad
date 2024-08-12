import { requestor } from "@/service/requestor";
import { instance } from "../apis";
import { PatchUserDataReq, PatchUserDataRes, PostSignupReq } from "./user.type";

export const patchUserInfo = async (
  userData: PatchUserDataReq,
): Promise<PatchUserDataRes> => {
  const response = await requestor.patch(`/users/me`, userData);
  console.log(response);
  return response.data;
};

export const postSignup = async (userData: PostSignupReq) => {
  await instance.post(`/users`, userData);
  return {
    email: userData.email,
    password: userData.password,
  };
};
