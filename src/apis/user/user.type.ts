/**
 * @param PostSignupReq /{
  email: string;
  nickname: string;
  password: string;
}
 */

export interface PostSignupReq {
  email: string;
  nickname: string;
  password: string;
}

export interface PatchUserDataReq {
  nickname: string;
  profileImageUrl?: string;
  newPassword: string;
}

export interface PatchUserDataRes {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}
