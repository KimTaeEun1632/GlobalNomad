export interface UsersSignup {
  email: string;
  nickname: string;
  password: string;
}

export interface UsersCheckMyInformation {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface UsersEditMyInformation {
  nickname: string;
  profileImageUrl?: string;
  newPassword?: string;
}

export interface UsersProfileImageUrl {
  profileImageUrl: string;
}
