import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const host = req.headers.get("host");
  const subDomain = host.split(".")[0];

  console.log(subDomain, "sub");
  console.log(req.nextUrl.pathname);

//   this condition for prod mode ! not dev mode
  if (subDomain !== "sepehrcc") {
    return NextResponse.redirect("https://next-platform.vercel.app/notfound", 301);
  }

  return NextResponse.next();
}
