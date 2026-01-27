import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone } = body;

    // Validation
    if (!name || !phone) {
      return NextResponse.json(
        { success: false, message: "Name and phone are required" },
        { status: 400 }
      );
    }

    // Validate phone format (basic validation for 10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { success: false, message: "Phone number must be 10 digits" },
        { status: 400 }
      );
    }

    // Validate name length
    if (name.trim().length < 2) {
      return NextResponse.json(
        { success: false, message: "Name must be at least 2 characters" },
        { status: 400 }
      );
    }

    // Find the last patient token
    const lastPatient = await prisma.patient.findFirst({
      orderBy: {
        token: "desc",
      },
    });

    // Generate new token (last token + 1, or start at 1)
    const newToken = lastPatient ? lastPatient.token + 1 : 1;

    // Create patient
    const patient = await prisma.patient.create({
      data: {
        name: name.trim(),
        phone,
        token: newToken,
        status: "waiting",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Patient registered successfully",
        token: patient.token,
        patient: {
          id: patient.id,
          name: patient.name,
          phone: patient.phone,
          token: patient.token,
          status: patient.status,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Patient registration error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
