import { Request, Response, NextFunction, Router } from "express";
import { genreController } from "../dependencyInjection/genre";
import { authorization } from "../middlewares";

const router = Router();

router.get("/", (req: Request, res: Response) =>
  genreController.getAllGenres(req, res)
);

router.get("/genre", (req: Request, res: Response) =>
  genreController.getGenreByName(req, res)
);

router.get("/genre/:id", (req: Request, res: Response) =>
  genreController.getGenreById(req, res)
);

router.post(
  "/",
  (req: Request, res: Response, next: NextFunction) =>
    authorization.verifyToken(req, res, next),
  (req: Request, res: Response, next: NextFunction) =>
    authorization.verifyIfUserIsAdmin(req, res, next),
  (req: Request, res: Response) => genreController.createGenre(req, res)
);

router.put(
  "/",
  (req: Request, res: Response, next: NextFunction) =>
    authorization.verifyToken(req, res, next),
  (req: Request, res: Response, next: NextFunction) =>
    authorization.verifyIfUserIsAdmin(req, res, next),
  (req: Request, res: Response) => genreController.updateGenre(req, res)
);

router.delete(
  "/",
  (req: Request, res: Response, next: NextFunction) =>
    authorization.verifyToken(req, res, next),
  (req: Request, res: Response, next: NextFunction) =>
    authorization.verifyIfUserIsAdmin(req, res, next),
  (req: Request, res: Response) => genreController.deleteGenre(req, res)
);

export { router };
