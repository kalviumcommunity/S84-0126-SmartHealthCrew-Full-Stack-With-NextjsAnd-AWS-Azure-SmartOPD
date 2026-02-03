import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretjwtkey";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.admin.findUnique({ where: { email } });

    if (!user)
      return NextResponse.json(
        { success: false, message: "Admin not found" },
        { status: 404 }
      );

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid)
      return NextResponse.json(
        { success: false, message: "Invalid password" },
        { status: 401 }
      );

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return NextResponse.json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Login failed", error },
      { status: 500 }
    );
  }
}
