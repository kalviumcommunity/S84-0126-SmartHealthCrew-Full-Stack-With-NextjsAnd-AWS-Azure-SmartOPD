import { NextRequest, NextResponse } from "next/server";
import { adminLoginSchema } from "@/lib/schemas/adminSchema";
import { ZodError } from "zod";
import { comparePassword, signAdminToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { serialize } from "cookie";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = adminLoginSchema.parse(body);

    // Find admin by email
    const admin = await prisma.admin.findUnique({
      where: { email: validated.email },
    });

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Compare password
    const isPasswordValid = await comparePassword(
      validated.password,
      admin.password
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = signAdminToken({
      adminId: admin.id,
      email: admin.email,
    });

    // Create HTTP-only cookie
    const cookie = serialize("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    // Create response with cookie
    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",
        admin: {
          id: admin.id,
          email: admin.email,
        },
      },
      { status: 200 }
    );

    response.headers.set("Set-Cookie", cookie);

    return response;
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation error",
          errors: error.errors.map((e) => ({
            field: e.path[0],
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }
    console.error("Admin login error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
