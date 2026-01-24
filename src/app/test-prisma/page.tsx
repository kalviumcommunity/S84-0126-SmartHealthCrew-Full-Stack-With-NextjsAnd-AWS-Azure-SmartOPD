import { prisma } from "@/lib/prisma";

export default async function TestPrisma() {
  const patients = await prisma.patient.findMany();
  console.log("Patients:", patients);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Prisma Test Page</h1>
      <p className="mb-2">Check your terminal logs for Prisma query output</p>
      <div className="bg-gray-100 p-4 rounded">
        <p className="font-semibold">Patient Count: {patients.length}</p>
        {patients.length > 0 ? (
          <ul className="mt-2">
            {patients.map((patient) => (
              <li key={patient.id}>
                {patient.name} - Token: {patient.token} - Status:{" "}
                {patient.status}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 mt-2">No patients found in database</p>
        )}
      </div>
    </div>
  );
}
