import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { handleError } from "@/lib/errorHandler";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretjwtkey";

export async function GET(req: Request) {
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

    return NextResponse.json({
      success: true,
      message: "Protected route access granted",
      user: decoded,
    });
  } catch (error) {
    return handleError(error, "GET /api/users");
  }
}
