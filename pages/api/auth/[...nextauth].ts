import { auth } from "@/apis/auth/auth";
import { AxiosError } from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req): Promise<any> {
        try {
          const req = {
            email: credentials?.email || "",
            password: credentials?.password || "",
          };
          const user = await auth.signIn(req);
          return {
            ...user,
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
            id: user.user.id,
            email: user.user.email,
            name: user.user.nickname,
            image: user.user.profileImageUrl,
          };
        } catch (e: unknown) {
          if (e instanceof AxiosError) {
            throw new Error(e.response?.data.message || e.message);
          }
          throw e;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ credentials }) {
      if (credentials) {
        return true;
      } else {
        return false;
      }
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.email = user.email;
        token.id = user.id;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.name = user.name;
        token.picture = user.image;
        // 필요한 추가 데이터가 있다면 여기에 추가
      }
      if (trigger === "update" && session) {
        token.picture = session.image;
        token.name = session.name;
      }
      return { ...token, ...user };
    },
    async session({ session, token }) {
      if (!session.user) {
        session.user = {};
      }

      if (token) {
        session.user.email = token.email;
        session.user.id = token.id;
        session.user.image = token.picture;
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.name = token.name;
        // 필요한 추가 데이터를 여기에 추가
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/sign-in",
  },
};

export default NextAuth(authOptions);
