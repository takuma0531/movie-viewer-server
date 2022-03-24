import express, { Express } from "express";
import { ServerComponents, Route } from "./typings/common/server";

export class Server {
  private readonly _app: Express;
  private readonly _port: string;
  private readonly _host: string;

  constructor(serverComponents: ServerComponents) {
    this._app = express();
    this._host = serverComponents.host;
    this._port = serverComponents.port;
    this.setMiddlewares(serverComponents.middlewares);
    this.setRoutes(serverComponents.routes);
  }

  public init() {
    this._app.listen(this._port, () =>
      console.log(`Server is running on ${this._host}:${this._port}`)
    );
  }

  private setMiddlewares(middlewares: Array<any>) {
    middlewares.forEach((middleware) => {
      this._app.use(middleware);
    });
  }

  private setRoutes(routes: Array<any>) {
    routes.forEach((route: Route) => {
      this._app.use(route.baseRoute, route.router);
    });
  }
}
