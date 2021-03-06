import { Request, Response, NextFunction, Router } from "express";
import { movieController } from "../dependencyInjection/movie";
import { authorization } from "../middlewares";

const router = Router();

router.get("/", (req: Request, res: Response) =>
  movieController.getAllMoivies(req, res)
);

router.get("/movie/:id", (req: Request, res: Response) =>
  movieController.getMovieById(req, res)
);

router.get("/search", (req: Request, res: Response) =>
  movieController.getMoviesByTitle(req, res)
);

router.get("/recent", (req: Request, res: Response) =>
  movieController.getRecentMovies(req, res)
);

router.post(
  "/",
  (req: Request, res: Response, next: NextFunction) =>
    authorization.verifyToken(req, res, next),
  (req: Request, res: Response) => movieController.createMovie(req, res)
);

router.put(
  "/",
  (req: Request, res: Response, next: NextFunction) =>
    authorization.verifyToken(req, res, next),
  (req: Request, res: Response) => movieController.updateMovie(req, res)
);

router.delete(
  "/",
  (req: Request, res: Response, next: NextFunction) =>
    authorization.verifyToken(req, res, next),
  (req: Request, res: Response) => movieController.deleteMovie(req, res)
);

export { router };
