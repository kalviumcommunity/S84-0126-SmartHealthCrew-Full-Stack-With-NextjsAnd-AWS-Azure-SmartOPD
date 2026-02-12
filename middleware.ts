import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/auth";
import { v4 as uuidv4 } from "uuid";

/**
 * RBAC Middleware for SmartOPD
 * Protects API routes based on user roles
 *
 * Protected Routes:
 * - /api/admin/* - Requires admin role
 * - /api/users/* - Requires any authenticated user
 *
 * Public Routes:
 * - /api/auth/* - Login/Signup (no authentication needed)
 * - /api/patients - Public patient registration
 * - /api/queue/* - Public queue status
 */

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Add request ID for logging and tracing
  const requestId = uuidv4();
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-request-id", requestId);

  // Identity route types
  const isAdminRoute = pathname.startsWith("/api/admin");
  const isUserRoute = pathname.startsWith("/api/users");

  // Allow auth routes to bypass (login/signup)
  const isAuthRoute =
    pathname.startsWith("/api/admin/login") ||
    pathname.startsWith("/api/admin/signup") ||
    pathname.startsWith("/api/auth/login") ||
    pathname.startsWith("/api/auth/signup");

  // Skip middleware for non-protected routes
  if ((!isAdminRoute && !isUserRoute) || isAuthRoute) {
    return NextResponse.next();
  }

  // Extract token from Authorization header or cookie
  const authHeader = req.headers.get("authorization");
  const cookieToken = req.cookies.get("adminToken")?.value;

  let token: string | null = null;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else if (cookieToken) {
    token = cookieToken;
  }

  // Check if token exists
  if (!token) {
    return NextResponse.json(
      {
        success: false,
        message: "Authentication required. Please provide a valid token.",
      },
      { status: 401 }
    );
  }

  // Verify token
  const decoded = verifyAdminToken(token);

  if (!decoded) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid or expired token. Please login again.",
      },
      { status: 403 }
    );
  }

  // RBAC: Check role for admin routes
  if (isAdminRoute && decoded.role !== "admin") {
    return NextResponse.json(
      {
        success: false,
        message: "Access denied. Admin privileges required.",
      },
      { status: 403 }
    );
  }

  // Valid token and authorized role - proceed
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    "/api/users/:path*", // Protected user routes
    "/api/admin/:path*", // Protected admin routes
  ],
};
