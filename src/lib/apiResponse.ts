import jwt from "jsonwebtoken";
const JWT_SECRET = "your-secret-key-change-in-production";

export function signAdminToken(payload: {
  adminId: number;
  email: string;
  role: string;
}): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}
