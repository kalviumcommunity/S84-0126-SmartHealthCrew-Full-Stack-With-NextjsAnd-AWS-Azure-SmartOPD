import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretjwtkey";

export async function GET(req: Request) {
  try {
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
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid or expired token" },
      { status: 403 }
    );
  }
}
