import { NextRequest, NextResponse } from "next/server";
import { jwtUtils } from "./lib/jwt";

const AUTH_ROUTES = ["/login", "/register"];

const PROTECTED_ROUTES = ["/admin", "/provider", "/dashboard"];

const ROLE_ROUTES = {
  ADMIN: ["/admin"],

  PROVIDER: ["/provider"],

  CUSTOMER: ["/dashboard"],
};

const hasRouteAccess = (role: string, pathname: string) => {
  const allowedRoutes = ROLE_ROUTES[role as keyof typeof ROLE_ROUTES];

  if (!allowedRoutes) {
    return false;
  }

  return allowedRoutes.some((route) => pathname.startsWith(route));
};

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const accessToken = request.cookies.get("accessToken")?.value;

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

  /*
    Protect private routes
  */

  const needsAuth = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  if (needsAuth && !user) {
    return NextResponse.redirect(
      new URL(`/login?redirectTo=${pathname}`, request.url),
    );
  }

  /*
    Role Authorization
  */

  if (needsAuth && user && !hasRouteAccess(user.role as string, pathname)) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  /*
    Logged user visiting auth pages
  */

  if (AUTH_ROUTES.includes(pathname) && user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
