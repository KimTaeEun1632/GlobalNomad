// next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: {
      id?: number | string;
      accessToken?: string;
      refreshToken?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id?: number | string;
    accessToken?: string;
    refreshToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: number | string;
    accessToken?: string;
    refreshToken?: string;
  }
}
