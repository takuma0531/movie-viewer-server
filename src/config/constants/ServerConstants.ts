import { initDotEnv } from "..";

initDotEnv();

export class ServerConstants {
  public static readonly SERVER_HOST = process.env.HOST || "http://localhost";
  public static readonly SERVER_PORT = process.env.PORT || "5000";
}
