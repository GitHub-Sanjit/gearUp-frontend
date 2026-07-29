import { NextRequest, NextResponse } from "next/server";
import { jwtUtils } from "./lib/jwt";

const AUTH_ROUTES = ["/login", "/register"];

const PROTECTED_ROUTES = ["/dashboard", "/provider", "/admin"];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const accessToken = request.cookies.get("accessToken")?.value;

  const refreshToken = request.cookies.get("refreshToken")?.value;

  let user = null;

  if (accessToken) {
    const result = await jwtUtils.verifyToken(
      accessToken,
      process.env.JWT_ACCESS_SECRET!,
    );

    if (result.success) {
      user = result.data;
    }
  }

  // protect private routes

  const needsAuth = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  if (needsAuth && !user) {
    return NextResponse.redirect(
      new URL(`/login?redirectTo=${pathname}`, request.url),
    );
  }

  // logged user visiting login

  if (AUTH_ROUTES.includes(pathname) && user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
