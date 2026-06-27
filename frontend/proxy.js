import {
  clerkMiddleware,
  createRouteMatcher,
} from "@clerk/nextjs/server";

import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/explore(.*)",
  "/cookbook(.*)",
  "/generate(.*)",
  "/about(.*)",
]);

export default clerkMiddleware(async (auth, req) => {

  const { userId } = await auth();

  if (!userId && isProtectedRoute(req)) {

    return NextResponse.redirect(
      new URL("/sign-in", req.url)
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)",
    "/(api|trpc)(.*)",
  ],
};