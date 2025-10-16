// src/infrastructure/services/TokenService.ts
import jwt from "jsonwebtoken";

export class TokenService implements TokenService {
  constructor(private readonly secret: string) {}

  generateToken(payload: any): string {
    return jwt.sign(payload, this.secret, {
      expiresIn: "24h", // Ajuste conforme necessário
    });
  }
}
