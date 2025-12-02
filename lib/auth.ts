import jwt from "jsonwebtoken";
import type { JwtUserPayload } from "../types/jwt";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export function signToken(payload: JwtUserPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): JwtUserPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtUserPayload;
  } catch {
    return null;
  }
}
