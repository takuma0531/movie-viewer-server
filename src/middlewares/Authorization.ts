import { Request, Response, NextFunction } from "express";
import { jwtTokenService } from "../services/token/TokenService";
import { ITokenService } from "../services/token/ITokenService";
import { HttpStatusCode } from "../enums/HttpStatusCode";
import { UserRole } from "../enums/UserRole";
import { ErrorResponse } from "../typings/common/response";

class Authorization {
  constructor(private readonly _tokenService: ITokenService) {}

  public verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("hello");
      let token = req.get("authorization");
      if (!token) return this.unauthorized(res);

      token = token!.slice(7);
      const decoded = this._tokenService.verifyToken(token);
      req.userClaims = decoded;

      return next();
    } catch (err: any) {
      return this.unauthorized(res, err.message);
    }
  }

  public verifyIfUserIsAdmin(req: Request, res: Response, next: NextFunction) {
    if (req.userClaims.role !== UserRole.ADMIN) return this.unauthorized(res);
    return next();
  }

  private unauthorized(res: Response, message: string = "Unauthorized") {
    const errorResponse: ErrorResponse = {
      error: {
        code: HttpStatusCode.UNAUTHORIZED,
        message: message,
      },
    };
    return res.status(HttpStatusCode.UNAUTHORIZED).json(errorResponse);
  }
}

export const authorization = new Authorization(jwtTokenService);
