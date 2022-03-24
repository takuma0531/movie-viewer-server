import { Router } from "express";

interface ServerComponents {
  host: string;
  port: string;
  middlewares: Array<any>;
  routes: Array<Route>;
}

interface Route {
  baseRoute: string;
  router: Router;
}

export { ServerComponents, Route };
