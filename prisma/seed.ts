import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Seed admin
  await prisma.admin.create({
    data: {
      email: "admin@example.com",
      password: await bcrypt.hash("admin123", 10),
    },
  });

  // Seed patients
  await prisma.patient.createMany({
    data: [
      { name: "Amit", phone: "9876543210", token: 1 },
      { name: "Sita", phone: "9123456780", token: 2 },
    ],
  });

  console.log("Seed data inserted successfully!");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
