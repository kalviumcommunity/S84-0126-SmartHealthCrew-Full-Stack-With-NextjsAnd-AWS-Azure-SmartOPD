import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * POST /api/queue/next
 * Calls the next patient in the queue and marks the current one as completed
 */
export async function POST() {
  try {
    // Find the next waiting patient
    const next = await prisma.patient.findFirst({
      where: { status: "waiting" },
      orderBy: { token: "asc" },
    });

    if (!next) {
      return NextResponse.json(
        { message: "No more patients in queue" },
        { status: 200 }
      );
    }

    // Mark the patient as completed
    await prisma.patient.update({
      where: { id: next.id },
      data: { status: "completed" },
    });

    // Get the next waiting patient (if any)
    const upcoming = await prisma.patient.findFirst({
      where: { status: "waiting" },
      orderBy: { token: "asc" },
    });

    return NextResponse.json({
      calledToken: next.token,
      nextToken: upcoming?.token ?? null,
      message: `Token ${next.token} called`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to call next patient" },
      { status: 500 }
    );
  }
}
