import { Schema, model } from "mongoose";
import { UserDocument, UserModel } from "../../../typings/model/user";
import { userPlugin } from "./user.plugin";

const userSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    continent: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

userPlugin(userSchema);

export const User = model<UserDocument, UserModel>("User", userSchema);
