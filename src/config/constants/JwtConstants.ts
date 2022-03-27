import { initDotEnv } from "..";

initDotEnv();

export class JwtConstants {
  public static readonly JWT_SECRET_KEY =
    process.env.JWT_SECRET_KEY || "secret";
  public static readonly JWT_EXPIRE_IN = process.env.JWT_EXPIRE_IN || 3600000;
  public static readonly JWT_ALGORITHM = "HS256";
  public static readonly JWT_ISSUER = process.env.JWT_ISSUER;
  public static readonly JWT_AUDIENCE = process.env.JWT_AUDIENCE;
  public static readonly JWT_ENCODING = "UTF8";
  public static readonly JWT_ID = "";
  public static readonly JWT_SUBJECT = "";
}
