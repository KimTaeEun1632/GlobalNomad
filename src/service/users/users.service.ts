import { requestor, requestorWithFormData } from "@/service/requestor";
import {
  UsersSignup,
  UsersCheckMyInformation,
  UsersEditMyInformation,
  UsersProfileImageUrl,
} from "./users.type";

class UsersService {
  postUsersSignup() {
    return requestor.post<UsersSignup>(`/users`);
  }

  getUsersCheckMyInformation(profileImageUrl: string = "") {
    return requestor.get<UsersCheckMyInformation>(`/users/me`, {
      params: { profileImageUrl },
    });
  }
  getUser() {
    return requestor.get<UsersCheckMyInformation>(`/users/me`);
  }

  patchUsersEditMyInformation(data: UsersEditMyInformation) {
    console.log(data);
    return requestor.patch<UsersEditMyInformation>(`/users/me`, data);
  }

  postUsersProfileImageUrl(formData: FormData) {
    console.log(formData.get("profileImage"));
    return requestorWithFormData.post<UsersProfileImageUrl>(`/users/me/image`, {
      image: formData.get("profileImage"),
    });
  }
}

export default new UsersService();
