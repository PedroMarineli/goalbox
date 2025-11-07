import { withAuth } from "next-auth/middleware"

export default withAuth;

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/checkout/:path*'],
}
