import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/queue/current
 * Returns the current token being served
 */
export async function GET() {
  try {
    const current = await prisma.patient.findFirst({
      where: { status: "waiting" },
      orderBy: { token: "asc" },
    });

    return NextResponse.json({
      currentToken: current?.token ?? 0,
      patient: current || null,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch current token" },
      { status: 500 }
    );
  }
}
