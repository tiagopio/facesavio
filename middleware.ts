import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isOnboardingRoute = createRouteMatcher(["/onboarding"])
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);

export default clerkMiddleware((auth, req) => {
  const { userId, sessionClaims, redirectToSignIn } = auth();

    if (userId && isOnboardingRoute(req)) {
      return NextResponse.next();
    }

    if (!userId && !isPublicRoute(req))
      return redirectToSignIn({ returnBackUrl: req.url });

    if (userId && !sessionClaims?.metadata?.onboardingComplete) {
      const onboardingUrl = new URL("/onboarding", req.url);
      return NextResponse.redirect(onboardingUrl);
    }

    if (userId && !isPublicRoute(req)) return NextResponse.next();
});
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};