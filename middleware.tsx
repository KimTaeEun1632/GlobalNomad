import type { NextRequest, NextFetchEvent } from "next/server";
import { NextResponse } from "next/server";
import { decode, getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest, _: NextFetchEvent) {
  const url = req.nextUrl.clone();
  const redirectTo = (dest: string) =>
    NextResponse.redirect(new URL(dest, url));

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    raw: true,
  });

  try {
    const decoded = await decode({
      token,
      secret: process.env.NEXTAUTH_SECRET!,
    });

    if (url.pathname.startsWith("/auth/sign-in")) {
      if (decoded) {
        return redirectTo("/");
      }
    } else {
      if (!decoded) {
        return redirectTo("/auth/sign-in");
      }
    }
    if (url.pathname.startsWith("/auth/sign-up")) {
      if (decoded) {
        return redirectTo("/");
      }
    }
  } catch (e) {
    console.log("decoded:", e);
  }
}

export const config = {
  matcher: ["/auth/:path*", "/my-page/:path*"],
};
