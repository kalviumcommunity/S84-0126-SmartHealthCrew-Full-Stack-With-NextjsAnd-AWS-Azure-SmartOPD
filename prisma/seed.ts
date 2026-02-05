import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

// Load environment variables from .env.local
config({ path: ".env.local" });

// For seeding, we can use the standard Prisma Client without the adapter
const prisma = new PrismaClient();

async function main() {
  // Seed admin
  await prisma.admin.upsert({
    where: { email: "admin@smartopd.com" },
    update: {},
    create: {
      email: "admin@smartopd.com",
      password: await bcrypt.hash("admin123", 10),
      role: "admin",
    },
  });

  console.log("✅ Admin user created: admin@smartopd.com / admin123");

  // Seed patients
  const existingPatients = await prisma.patient.count();
  if (existingPatients === 0) {
    await prisma.patient.createMany({
      data: [
        { name: "Amit Kumar", phone: "9876543210", token: 1 },
        { name: "Sita Sharma", phone: "9123456780", token: 2 },
        { name: "Rahul Verma", phone: "9988776655", token: 3 },
      ],
    });
    console.log("✅ Seed patients created");
  }

  console.log("✅ Seed data inserted successfully!");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
