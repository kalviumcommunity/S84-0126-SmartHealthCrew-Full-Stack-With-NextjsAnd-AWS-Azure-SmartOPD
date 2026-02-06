import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createAppointmentTransaction() {
  try {
    const result = await prisma.$transaction(async (tx) => {
      const patient = await tx.patient.create({
        data: {
          name: "Transaction Test",
          phone: "9999999999",
          token: 500,
        },
      });

      const appointment = await tx.appointment.create({
        data: {
          patientId: patient.id,
          doctorId: 1,
          dateTime: new Date(),
          status: "scheduled",
        },
      });

      return { patient, appointment };
    });

    console.log("Transaction successful", result);
  } catch (error) {
    console.error("Transaction failed. Rolled back.", error);
  }
}
