import { JwtPayload } from "jsonwebtoken";

declare namespace Express {
  export interface req {
    user: {
      id_user: number;
    };
  }
}