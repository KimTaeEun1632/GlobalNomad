// import React, {
//   createContext,
//   useContext,
//   useState,
//   ReactNode,
//   useEffect,
// } from "react";
// import { useRouter } from "next/router";
// import { auth } from "@/apis/auth/auth";
// import { FormValues, PostAuthLoginRes, UserInfo } from "@/apis/auth/auth.type";
// import { useMutation } from "@tanstack/react-query";
// import { AxiosError } from "axios";
// import Cookies from "js-cookie";
// import Toast from "@/Components/Toast/Toast";

// interface ErrorMessage {
//   message: string;
// }

// interface AuthContextProps {
//   user: PostAuthLoginRes | null;
//   signIn: (data: FormValues) => Promise<void>;
//   signOut: () => void;
// }

// const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<PostAuthLoginRes | null>(null);
//   const [showToast, setShowToast] = useState<boolean>(false);
//   const [toastMessage, setToastMessage] = useState<string>("");
//   const router = useRouter();

//   useEffect(() => {
//     const accessToken = Cookies.get("accessToken");
//     const refreshToken = Cookies.get("refreshToken");

//     if (accessToken) {
//       auth
//         .getUser()
//         .then((data) => {
//           setUser({
//             accessToken: accessToken as string,
//             refreshToken: refreshToken as string,
//             user: data as UserInfo,
//           });
//           sessionStorage.setItem("session", JSON.stringify(user));
//         })
//         .catch(() => {
//           setUser(null);
//         });
//     }
//   }, []);

//   const signInMutation = useMutation({
//     mutationFn: (data: FormValues) => auth.signIn(data),
//     mutationKey: ["signIn"],
//     onSuccess: (data: PostAuthLoginRes) => {
//       Cookies.remove("accessToken");
//       Cookies.remove("refreshToken");
//       if (data.accessToken) {
//         Cookies.set("accessToken", data.accessToken, {
//           expires: 1,
//         });
//         Cookies.set("refreshToken", data.refreshToken, { expires: 7 }); // 7일 동안 유효
//         setUser(data);
//         router.push("/");
//       }
//     },
//     onError: (error: AxiosError<ErrorMessage>) => {
//       console.error("error", error);
//       setToastMessage(error.response?.data.message || "");
//       setShowToast(true);
//     },
//   });

//   const signIn = async (data: FormValues) => {
//     signInMutation.mutate(data);
//   };

//   const signOut = () => {
//     setUser(null);
//     Cookies.remove("accessToken");
//     Cookies.remove("refreshToken");
//   };

//   return (
//     <AuthContext.Provider value={{ user, signIn, signOut }}>
//       {children}
//       {showToast && (
//         <Toast onShow={() => setShowToast(false)}>{toastMessage}</Toast>
//       )}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };
