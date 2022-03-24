import express from "express";
import cors from "cors";
import { ServerComponents } from "./typings/common/server";
import { Server } from "./Server";
import { ServerConstants } from "./config/constants";

const serverComponents: ServerComponents = {
  host: ServerConstants.SERVER_HOST,
  port: ServerConstants.SERVER_PORT,
  middlewares: [express.json(), cors()],
  routes: [],
};

const server = new Server(serverComponents);
server.init();
