import express from "express";
import cors from "cors";
import { ServerComponents } from "./typings/common/server";
import { Server } from "./Server";
import { ServerConstants } from "./config/constants";
import {
  RouterToConfirmRunning,
  artistRouter,
  commentRouter,
  directorRouter,
  genreRouter,
  movieRouter,
  ratingRouter,
  userRouter,
} from "./routes";
import { connectDB } from "./db/mongoose";

connectDB();

const serverComponents: ServerComponents = {
  host: ServerConstants.SERVER_HOST,
  port: ServerConstants.SERVER_PORT,
  middlewares: [express.json(), cors(), express.urlencoded({ extended: true })],
  routes: [
    {
      baseRoute: "/api/v1",
      router: RouterToConfirmRunning,
    },
    {
      baseRoute: "/api/v1/artists",
      router: artistRouter,
    },
    {
      baseRoute: "/api/v1/comments",
      router: commentRouter,
    },
    {
      baseRoute: "/api/v1/directors",
      router: directorRouter,
    },
    {
      baseRoute: "/api/v1/genres",
      router: genreRouter,
    },
    {
      baseRoute: "/api/v1/movies",
      router: movieRouter,
    },
    {
      baseRoute: "/api/v1/ratings",
      router: ratingRouter,
    },
    {
      baseRoute: "/api/v1/users",
      router: userRouter,
    },
  ],
};

const server = new Server(serverComponents);
server.init();
