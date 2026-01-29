import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, phone } = await req.json();

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
          name,
          phone,
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
    console.error("Transaction failed:", error);
    return Response.json(
      { success: false, message: "Registration failed" },
      { status: 500 }
    );
  }
}
