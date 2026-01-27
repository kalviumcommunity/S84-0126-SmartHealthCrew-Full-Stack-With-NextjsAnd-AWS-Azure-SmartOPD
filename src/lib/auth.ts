import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";
const SALT_ROUNDS = 10;

// JWT Token Helpers
export function signAdminToken(payload: {
  adminId: number;
  email: string;
}): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}

export function verifyAdminToken(
  token: string
): { adminId: number; email: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      adminId: number;
      email: string;
    };
    return decoded;
  } catch (error) {
    return null;
  }
}

// Password Helpers
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
