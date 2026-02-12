import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { handleError } from "@/lib/errorHandler";
import { prisma } from "@/lib/prisma";
import redis from "@/lib/redis";
import { logger } from "@/lib/logger";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretjwtkey";

export async function GET(req: Request) {
  const requestId = req.headers.get("x-request-id");
  logger.info("Fetching users list", { requestId });

  try {
    // Simulate database or API failure
    // throw new Error("Database connection failed!");

    const header = req.headers.get("authorization");
    const token = header?.split(" ")[1];

    if (!token)
      return NextResponse.json(
        { success: false, message: "Token missing" },
        { status: 401 }
      );

    const decoded = jwt.verify(token, JWT_SECRET);

    // Check Cache
    const cacheKey = "users:list";
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      console.log("Cache Hit");
      return NextResponse.json({
        success: true,
        message: "Protected route access granted (Cached)",
        user: decoded,
        data: JSON.parse(cachedData),
      });
    }

    console.log("Cache Miss - Fetching from DB");
    // Fetch real data (Using Admin model as simple User equivalent for this demo)
    const users = await prisma.admin.findMany({
      select: { id: true, name: true, email: true, role: true },
    });

    // Cache data for 60 seconds (TTL)
    await redis.set(cacheKey, JSON.stringify(users), "EX", 60);

    return NextResponse.json({
      success: true,
      message: "Protected route access granted (Fetched)",
      user: decoded,
      data: users,
    });
  } catch (error) {
    return handleError(error, "GET /api/users", requestId);
  }
}
