import {
  RatingCreateDto,
  RatingReadDto,
  RatingUpdateDto,
} from "../../typings/model/rating/dto";

export interface IRatingService {
  getRatingsByMovie(movieId: string): Promise<RatingReadDto[] | null>;
  populateRatingsByUserAtSpecificAgeAndMovie(
    movieId: string,
    minAge: number,
    maxAge: number
  ): Promise<RatingReadDto[] | null>;
  populateRatingsByUserInSpecificContinentAndMovie(
    movieId: string,
    continent: string
  ): Promise<RatingReadDto[] | null>;
  getRatingById(id: string): Promise<RatingReadDto | null>;
  createRating(ratingCreateDto: RatingCreateDto): Promise<RatingReadDto>;
  updateRating(ratingUpdateDto: RatingUpdateDto): Promise<RatingReadDto | null>;
}
