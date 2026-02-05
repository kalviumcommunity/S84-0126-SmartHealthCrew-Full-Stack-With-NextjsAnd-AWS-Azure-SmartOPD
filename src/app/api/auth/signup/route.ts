import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    const existingUser = await prisma.admin.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Admin already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.admin.create({
      data: { name, email, password: hashedPassword, role: "admin" },
    });

    return NextResponse.json({
      success: true,
      message: "Signup successful",
      user: newUser,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Signup failed", error },
      { status: 500 }
    );
  }
}
