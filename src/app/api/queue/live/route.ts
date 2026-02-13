import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendSuccess, sendError } from "@/lib/responseHandler";
import { ERROR_CODES } from "@/lib/errorCodes";

/**
 * GET /api/queue/live
 * Returns the current live queue state for the public broadcast
 */
export async function GET(req: NextRequest) {
  // TODO: Implement caching for this route
  try {
    const patients = await prisma.patient.findMany({
      where: {
        status: {
          in: ["waiting", "in-consultation"],
        },
      },
      orderBy: {
        token: "asc",
      },
      take: 10, // Show current and next 9
    });

    const currentServing =
      patients.find((p) => p.status === "in-consultation") || null;
    const waitingQueue = patients.filter((p) => p.status === "waiting");

    return sendSuccess(
      {
        currentServing,
        waitingQueue,
        totalWaiting: waitingQueue.length,
        lastUpdated: new Date().toISOString(),
      },
      "Live queue data fetched successfully"
    );
  } catch (error) {
    console.error("Live queue fetch error:", error);
    return sendError(
      "Failed to fetch live queue data",
      ERROR_CODES.DATABASE_FAILURE,
      500
    );
  }
}
