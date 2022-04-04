import { RatingController } from "../controllers/RatingController";
import { RatingService } from "../services/rating/RatingService";
import { RatingRepository } from "../db/repositories/rating/RatingRepository";
import { Rating } from "../db/models/rating/rating.model";

export const ratingRepository = new RatingRepository(Rating);
export const ratingService = new RatingService(ratingRepository);
export const ratingController = new RatingController(ratingService);
