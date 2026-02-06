import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getRecentPatients() {
  return prisma.patient.findMany({
    select: {
      id: true,
      name: true,
      phone: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });
}
