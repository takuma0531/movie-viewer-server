import { UserClaims } from "../..//typings/common/claims";

export interface ITokenService {
  generateJwt(payload: any): string;
  verifyToken(token: string): UserClaims;
}
