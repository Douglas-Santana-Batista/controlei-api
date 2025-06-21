import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET || 'dougras';

export const createToken = (id_user: number) => {
  return jwt.sign(
    { id_user },
    JWT_SECRET,
    { expiresIn: '1d',
      algorithm: "HS256"
     }
  );
};

export const comparePasswords = async (passwordEntered: string, encryptedPassword: string) => {
  return await bcrypt.compare(passwordEntered, encryptedPassword);
};