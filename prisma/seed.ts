import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.admin.create({
    data: {
      name: "System Admin",
      email: "admin@smartopd.com",
      password: await bcrypt.hash("admin123", 10),
      role: "admin",
    },
  });

  const doctor = await prisma.admin.create({
    data: {
      name: "Dr Smith",
      email: "doctor@smartopd.com",
      password: await bcrypt.hash("doctor123", 10),
      role: "doctor",
    },
  });

  const p1 = await prisma.patient.create({
    data: { name: "Amit", phone: "9876543210", token: 101 },
  });

  const p2 = await prisma.patient.create({
    data: { name: "Sita", phone: "9123456780", token: 102 },
  });

  const appt = await prisma.appointment.create({
    data: {
      patientId: p1.id,
      doctorId: doctor.id,
      dateTime: new Date(),
      status: "completed",
    },
  });

  await prisma.medicalRecord.create({
    data: {
      appointmentId: appt.id,
      diagnosis: "Common cold",
    },
  });

  console.log("✅ SEED SUCCESS");
}

main()
  .catch(console.error)
  .finally(async () => prisma.$disconnect());
