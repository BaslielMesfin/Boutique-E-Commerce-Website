import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin/dashboard routes
  if (pathname.startsWith("/admin/dashboard")) {
    const token = request.cookies.get("admin_token")?.value;
    const adminSecret = process.env.ADMIN_SECRET;

    if (!token || token !== adminSecret) {
      const loginUrl = new URL("/admin", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*"],
};
