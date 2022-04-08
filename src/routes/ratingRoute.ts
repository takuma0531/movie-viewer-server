import { Request, Response, NextFunction, Router } from "express";
import { ratingController } from "../dependencyInjection/rating";
import { authorization } from "../middlewares";

const router = Router();

router.get("/movie/user-age", (req: Request, res: Response) =>
  ratingController.getFilteredRatingByUserAtSpecificAgeAndMovie(req, res)
);

router.get("/movie/user-continent", (req: Request, res: Response) =>
  ratingController.getFilteredRatingsByUserInSpecificContinentAndMovie(req, res)
);

router.get("/movie/user-gender", (req: Request, res: Response) =>
  ratingController.getSortedRatingsByUserGenderAndMovie(req, res)
);

router.post(
  "/",
  (req: Request, res: Response, next: NextFunction) =>
    authorization.verifyToken(req, res, next),
  (req: Request, res: Response) => ratingController.createRating(req, res)
);

export { router };
