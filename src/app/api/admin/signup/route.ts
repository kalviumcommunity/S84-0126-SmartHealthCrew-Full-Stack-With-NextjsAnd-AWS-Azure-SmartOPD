import { NextRequest, NextResponse } from "next/server";
import { adminSignupSchema } from "@/lib/schemas/adminSchema";
import { ZodError } from "zod";
import { hashPassword } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = adminSignupSchema.parse(body);

    // Check if admin already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { email: validated.email },
    });

    if (existingAdmin) {
      return NextResponse.json(
        { success: false, message: "Admin with this email already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(validated.password);

    // Create admin
    const admin = await prisma.admin.create({
      data: {
        email: validated.email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Admin account created successfully",
        adminId: admin.id,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation Error",
          errors: error.errors.map((e) => ({
            field: e.path[0],
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }
    console.error("Admin signup error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
