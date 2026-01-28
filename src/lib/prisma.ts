import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { Pool, neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_S4ka2JemvPCx@ep-plain-boat-ah34ezh4-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

console.log(
  "Prisma initializing with connection string:",
  connectionString ? "Defined" : "Undefined"
);

const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool);

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
