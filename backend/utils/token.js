import jwt from "jsonwebtoken";

export function generateAccessToken(id) {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN, { expiresIn: 15 * 60 });
}

export function generateRefreshToken(id) {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN, { expiresIn: "7d" });
}
