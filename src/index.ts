import express from "express";
import cors from "cors";
import { serverComponents } from "./typings/common/server";
import { Server } from "./Server";

const serverComponents: serverComponents = {
  host: "http:/localhost",
  port: "5000",
  middlewares: [express.json(), cors()],
  routes: [],
};

const server = new Server(serverComponents);
server.init();
