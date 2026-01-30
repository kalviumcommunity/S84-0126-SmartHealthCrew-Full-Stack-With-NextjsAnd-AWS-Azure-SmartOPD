import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/patients
 * Retrieves all patients ordered by creation date (newest first)
 */
export async function GET() {
  try {
    const patients = await prisma.patient.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(patients);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch patients" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/patients
 * Creates a new patient and assigns a token number
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone } = body;

    // Validate input
    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone are required" },
        { status: 400 }
      );
    }

    // Get the last patient token to generate next token
    const last = await prisma.patient.findFirst({
      orderBy: { token: "desc" },
    });

    const newToken = (last?.token ?? 0) + 1;

    // Create new patient
    const patient = await prisma.patient.create({
      data: { name, phone, token: newToken },
    });

    return NextResponse.json(patient, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create patient" },
      { status: 500 }
    );
  }
}
