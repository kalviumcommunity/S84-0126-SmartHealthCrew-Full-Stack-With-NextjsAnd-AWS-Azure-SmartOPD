import { prisma } from "@/lib/prisma";
import { sendSuccess, sendError } from "@/lib/responseHandler";
import { ERROR_CODES } from "@/lib/errorCodes";

/**
 * GET /api/patients
 * Retrieves all patients ordered by creation date (newest first)
 */
export async function GET() {
  try {
    const patients = await prisma.patient.findMany({
      orderBy: { createdAt: "desc" },
    });
    return sendSuccess(patients, "Patients fetched successfully");
  } catch (error) {
    return sendError(
      "Failed to fetch patients",
      ERROR_CODES.DATABASE_FAILURE,
      500,
      error
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
      return sendError(
        "Name and phone are required",
        ERROR_CODES.VALIDATION_ERROR,
        400
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

    return sendSuccess(patient, "Patient created successfully", 201);
  } catch (error) {
    return sendError(
      "Failed to create patient",
      ERROR_CODES.DATABASE_FAILURE,
      500,
      error
    );
  }
}
