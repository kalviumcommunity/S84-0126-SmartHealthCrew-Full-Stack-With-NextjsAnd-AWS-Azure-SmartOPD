import { patientRegisterSchema } from "@/lib/schemas/patientSchema";
import { ZodError } from "zod";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const validated = patientRegisterSchema.parse(data);

    const result = await prisma.$transaction(async (tx) => {
      // 1. Get last token
      const last = await tx.patient.findFirst({
        orderBy: { token: "desc" },
        select: { token: true },
      });

      const newToken = (last?.token ?? 0) + 1;

      // 2. Create patient
      const patient = await tx.patient.create({
        data: {
          name: validated.name,
          phone: validated.phone,
          token: newToken,
        },
      });

      // 3. Create token entry
      await tx.queueToken.create({
        data: {
          token: newToken,
          patientId: patient.id,
        },
      });

      return { patient, token: newToken };
    });

    return Response.json({
      success: true,
      token: result.token,
      message: "Token generated successfully",
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: error.issues.map((e) => ({
            field: e.path[0],
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }
    console.error("Transaction failed:", error);
    return Response.json(
      { success: false, message: "Registration failed" },
      { status: 500 }
    );
  }
}
