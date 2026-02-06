import { prisma } from "@/lib/prisma";

export async function GET() {
  const patients = await prisma.patient.findMany();
  console.log(patients);

  return Response.json(patients);
}
