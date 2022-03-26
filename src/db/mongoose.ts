import { connect, ConnectOptions } from "mongoose";
import { DbConstants } from "../config/constants";

const connectDB = () => {
  try {
    connect(DbConstants.DB_CONNECTION_STRING);
    console.log("db connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export { connectDB };
