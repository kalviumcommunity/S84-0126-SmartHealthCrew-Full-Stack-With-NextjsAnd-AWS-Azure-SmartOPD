import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAuth } from "@/lib/adminMiddleware";
import { prisma } from "@/lib/prisma";

/**
 * PROTECTED ROUTE - Admin only
 * GET /api/admin/patients - Fetch all patients
 */
export async function GET(req: NextRequest) {
  // Verify admin authentication
  const authResponse = verifyAdminAuth(req);
  if (authResponse.error) {
    return authResponse.response;
  }

  try {
    const patients = await prisma.patient.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    // Calculate stats
    const stats = {
      total: patients.length,
      waiting: patients.filter((p) => p.status === "waiting").length,
      completed: patients.filter((p) => p.status === "completed").length,
    };

    return NextResponse.json(
      {
        success: true,
        patients,
        stats,
        count: patients.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch patients error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
