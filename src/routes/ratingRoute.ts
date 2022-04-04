import { Request, Response, NextFunction, Router } from "express";
import { ratingController } from "../dependencyInjection/rating";

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

export { router };
