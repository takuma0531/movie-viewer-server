import { config } from "dotenv";

export const initDotEnv = () =>
  config({ path: `${__dirname}/env.${process.env.NODE_ENV}` });
