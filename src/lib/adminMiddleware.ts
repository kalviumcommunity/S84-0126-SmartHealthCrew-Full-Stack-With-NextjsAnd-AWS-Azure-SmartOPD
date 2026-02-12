import { NextRequest, NextResponse } from "next/server";
import { parse } from "cookie";
import { verifyAdminToken } from "./auth";

export interface AuthenticatedRequest extends NextRequest {
  admin?: {
    adminId: number;
    email: string;
  };
}

/**
 * Middleware to verify admin authentication via JWT token in cookies
 * Use this to protect admin-only routes
 *
 * Example usage:
 *
 * import { verifyAdminAuth } from '@/lib/adminMiddleware';
 *
 * export async function GET(req: NextRequest) {
 *   const authResponse = verifyAdminAuth(req);
 *   if (authResponse.error) {
 *     return authResponse.response;
 *   }
 *
 *   // Admin is authenticated, proceed with logic
 *   const admin = authResponse.admin;
 *   // ... your protected route logic
 * }
 */
export function verifyAdminAuth(req: NextRequest): {
  admin?: { adminId: number; email: string };
  error?: boolean;
  response?: NextResponse;
} {
  const cookieHeader = req.headers.get("cookie");

  if (!cookieHeader) {
    return {
      error: true,
      response: NextResponse.json(
        { success: false, message: "Unauthorized - No token provided" },
        { status: 401 }
      ),
    };
  }

  const cookies = parse(cookieHeader);
  const token = cookies.adminToken;

  if (!token) {
    return {
      error: true,
      response: NextResponse.json(
        { success: false, message: "Unauthorized - No token provided" },
        { status: 401 }
      ),
    };
  }

  const decoded = verifyAdminToken(token);

  if (!decoded) {
    return {
      error: true,
      response: NextResponse.json(
        { success: false, message: "Unauthorized - Invalid token" },
        { status: 401 }
      ),
    };
  }

  return {
    admin: decoded,
  };
}
