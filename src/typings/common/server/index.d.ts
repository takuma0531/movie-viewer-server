import { Router } from "express";

interface serverComponents {
  host: string;
  port: string;
  middlewares: Array<any>;
  routes: Array<Route>;
}

interface Route {
  baseRoute: string;
  router: Router;
}

export { serverComponents, Route };
