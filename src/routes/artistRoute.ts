import { Request, Response, NextFunction, Router } from "express";
import { artistController } from "../dependencyInjection/artist";
import { authorization } from "../middlewares";

const router = Router();

router.get("/", (req: Request, res: Response) =>
  artistController.getAllArtists(req, res)
);

router.get("/artist/:id", (req: Request, res: Response) =>
  artistController.getArtistById(req, res)
);

router.get("/search", (req: Request, res: Response) =>
  artistController.getByName(req, res)
);

router.post(
  "/",
  (req: Request, res: Response, next: NextFunction) =>
    authorization.verifyToken(req, res, next),
  (req: Request, res: Response, next: NextFunction) =>
    authorization.verifyIfUserIsAdmin(req, res, next),
  (req: Request, res: Response) => artistController.registerArtist(req, res)
);

router.put(
  "/",
  (req: Request, res: Response, next: NextFunction) =>
    authorization.verifyToken(req, res, next),
  (req: Request, res: Response, next: NextFunction) =>
    authorization.verifyIfUserIsAdmin(req, res, next),
  (req: Request, res: Response) => artistController.updateArtist(req, res)
);

router.delete(
  "/:id",
  (req: Request, res: Response, next: NextFunction) =>
    authorization.verifyToken(req, res, next),
  (req: Request, res: Response, next: NextFunction) =>
    authorization.verifyIfUserIsAdmin(req, res, next),
  (req: Request, res: Response) => artistController.deleteArtist(req, res)
);

export { router };
