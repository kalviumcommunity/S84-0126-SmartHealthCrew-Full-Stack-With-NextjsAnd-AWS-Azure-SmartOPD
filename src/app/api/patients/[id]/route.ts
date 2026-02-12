import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/patients/[id]
 * Retrieves a single patient by ID
 */
export async function GET(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const patientId = Number(params.id);

    if (isNaN(patientId)) {
      return NextResponse.json(
        { error: "Invalid patient ID" },
        { status: 400 }
      );
    }

    const patient = await prisma.patient.findUnique({
      where: { id: patientId },
    });

    if (!patient) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }

    return NextResponse.json(patient);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch patient" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/patients/[id]
 * Updates a patient's information
 */
export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const patientId = Number(params.id);
    const body = await req.json();

    if (isNaN(patientId)) {
      return NextResponse.json(
        { error: "Invalid patient ID" },
        { status: 400 }
      );
    }

    const patient = await prisma.patient.update({
      where: { id: patientId },
      data: body,
    });

    return NextResponse.json(patient);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update patient" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/patients/[id]
 * Deletes a patient by ID
 */
export async function DELETE(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const patientId = Number(params.id);

    if (isNaN(patientId)) {
      return NextResponse.json(
        { error: "Invalid patient ID" },
        { status: 400 }
      );
    }

    await prisma.patient.delete({
      where: { id: patientId },
    });

    return NextResponse.json({ message: "Patient deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete patient" },
      { status: 500 }
    );
  }
}
