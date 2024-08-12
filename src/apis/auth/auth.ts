import { FormValues, PostAuthLoginReq, PostAuthLoginRes } from "./auth.type";
import { requestor } from "@/service/requestor";

export const auth = {
  signIn: async (req: FormValues) => {
    const response = await requestor.post("/auth/login", req);
    const data: PostAuthLoginRes = response.data;
    return data;
  },
  signUp: async (userData: FormValues) => {
    const response = await requestor.post("/users", userData);
    return response.data;
  },
  tokensUpdate: async (refreshToken: string) => {
    const response = await requestor.post(
      "auth/tokens",
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  },
  getUser: async () => {
    const response = await requestor.get("/users/me");
    return response.data;
  },
};
