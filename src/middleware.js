import { NextResponse } from "next/server";

export const config = {
  matcher: "/integrations/:path*",
};

export function middleware(request) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-createxyz-project-id", "8279b82c-af37-4a91-ab8a-5971da9c17bb");
  requestHeaders.set("x-createxyz-project-group-id", "c3c72fad-6f1e-403c-8ac7-f432c6bd74ff");


  request.nextUrl.href = `https://www.create.xyz/${request.nextUrl.pathname}`;

  return NextResponse.rewrite(request.nextUrl, {
    request: {
      headers: requestHeaders,
    },
  });
}