import { Pool } from "@neondatabase/serverless";
import "dotenv/config";

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_S4ka2JemvPCx@ep-plain-boat-ah34ezh4-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

console.log("Testing connection string length:", connectionString.length);
console.log("Starts with:", connectionString.substring(0, 10));

const pool = new Pool({ connectionString });

async function test() {
  try {
    const client = await pool.connect();
    console.log("Successfully connected to Neon!");
    const result = await client.query("SELECT NOW()");
    console.log("Time from DB:", result.rows[0]);
    client.release();
  } catch (err) {
    console.error("Connection failed:", err);
  } finally {
    await pool.end();
  }
}

test();
