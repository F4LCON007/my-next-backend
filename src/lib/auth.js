// src/lib/auth.js
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * the "token" cookie off an incoming Next.js request,
 * verifies it, and returns the decoded user payload.
 * Returns null if there's no token or it's invalid/expired.
 */
export function verifyJWT(request) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) return null;

    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded; // { id, email, username, iat, exp }
  } catch (error) {
    // Covers expired tokens, bad signature, malformed token, etc.
    return null;
  }
}
