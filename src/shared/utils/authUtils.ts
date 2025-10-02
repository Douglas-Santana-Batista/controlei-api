import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET || "dougras";

export const createToken = (publicId: string) => {
  return jwt.sign({ publicId }, JWT_SECRET, { expiresIn: "1d", algorithm: "HS256" });
};

export const comparePasswords = async (passwordEntered: string, encryptedPassword: string) => {
  return await bcrypt.compare(passwordEntered, encryptedPassword);
};

export const verifyToken = (token: string): { publicId: string } => {
  return jwt.verify(token, JWT_SECRET) as { publicId: string };
};
