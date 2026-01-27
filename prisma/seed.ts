import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { Pool, neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import ws from "ws";
import bcrypt from "bcrypt";

neonConfig.webSocketConstructor = ws;

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_S4ka2JemvPCx@ep-plain-boat-ah34ezh4-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

console.log(
  "Seed using connection string starting with:",
  connectionString.substring(0, 15)
);

const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.admin.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      password: await bcrypt.hash("admin123", 10),
    },
  });

  console.log("Admin seeded successfully!");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
