import { NextRequest, NextResponse } from "next/server";
import { jwtUtils } from "./lib/jwt";

const AUTH_ROUTES = ["/login", "/register", "/unauthorized"];

const PROTECTED_ROUTES = ["/admin", "/provider", "/dashboard"];

const ROLE_ROUTES = {
  ADMIN: ["/admin"],

  PROVIDER: ["/provider"],

  CUSTOMER: ["/dashboard"],
};

const hasRouteAccess = (role: string, pathname: string) => {
  const allowedRoutes = ROLE_ROUTES[role as keyof typeof ROLE_ROUTES];

  console.log("CHECK ACCESS:", {
    role,
    pathname,
    allowedRoutes,
    result: allowedRoutes?.some((route) => pathname.startsWith(route)),
  });

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

      console.log("PROXY USER:", user);
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
    switch (user.role) {
      case "ADMIN":
        return NextResponse.redirect(new URL("/admin", request.url));

      case "PROVIDER":
        return NextResponse.redirect(new URL("/provider", request.url));

      case "CUSTOMER":
        return NextResponse.redirect(new URL("/dashboard", request.url));

      default:
        return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
