import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { cookies } = req;
  const url = req.url;

  if (url.includes("/user")) {
    if (cookies?.token) {
      if (cookies?.role === "user") {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/", req.url));
      }
    } else {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  if (url.includes("/admin")) {
    if (cookies?.token) {
      if (cookies?.role === "admin") {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/", req.url));
      }
    } else {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }
}
