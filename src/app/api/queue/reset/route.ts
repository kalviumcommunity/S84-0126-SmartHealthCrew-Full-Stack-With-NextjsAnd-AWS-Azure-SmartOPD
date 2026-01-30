import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * POST /api/queue/reset
 * Resets the entire queue - marks all patients as waiting and resets their order
 * WARNING: This should be protected with admin authentication in production
 */
export async function POST() {
  try {
    // Reset all patients to waiting status
    await prisma.patient.updateMany({
      where: { status: "completed" },
      data: { status: "waiting" },
    });

    const count = await prisma.patient.count();

    return NextResponse.json({
      message: "Queue reset successfully",
      patientsReset: count,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to reset queue" },
      { status: 500 }
    );
  }
}
