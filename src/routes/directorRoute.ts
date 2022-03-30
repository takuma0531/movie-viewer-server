import { Request, Response, NextFunction, Router } from "express";
import { directorController } from "../dependencyInjection/director";
import { authorization } from "../middlewares";

const router = Router();

router.get("/", (req: Request, res: Response) =>
  directorController.getAllDirectors(req, res)
);

router.get("/director/:id", (req: Request, res: Response) =>
  directorController.getDirectorById(req, res)
);

router.get("/search", (req: Request, res: Response) =>
  directorController.getDirectorsByName(req, res)
);

router.post(
  "/",
  (req: Request, res: Response, next: NextFunction) =>
    authorization.verifyToken(req, res, next),
  (req: Request, res: Response, next: NextFunction) =>
    authorization.verifyIfUserIsAdmin(req, res, next),
  (req: Request, res: Response) => directorController.createDirector(req, res)
);

router.put(
  "/",
  (req: Request, res: Response, next: NextFunction) =>
    authorization.verifyToken(req, res, next),
  (req: Request, res: Response, next: NextFunction) =>
    authorization.verifyIfUserIsAdmin(req, res, next),
  (req: Request, res: Response) => directorController.updateDirector(req, res)
);

router.delete(
  "/",
  (req: Request, res: Response, next: NextFunction) =>
    authorization.verifyToken(req, res, next),
  (req: Request, res: Response, next: NextFunction) =>
    authorization.verifyIfUserIsAdmin(req, res, next),
  (req: Request, res: Response) => directorController.deleteDirector(req, res)
);

export { router };
