import {
  RatingCreateDto,
  RatingReadDto,
  RatingUpdateDto,
  RatingReadDtosFilteredByUserAge,
  RatingReadDtosFilteredByUserLocation,
  RatingReadDtosSortedByUserGender,
} from "../../typings/model/rating/dto";

export interface IRatingService {
  getRatingsByMovie(movieId: string): Promise<RatingReadDto[] | null>;
  filterRatingsByUserAtSpecificAgeAndMovie(
    movieId: string
  ): Promise<RatingReadDtosFilteredByUserAge | null>;
  filterRatingsByUserInSpecificContinentAndMovie(
    movieId: string
  ): Promise<RatingReadDtosFilteredByUserLocation | null>;
  sortRatingsByUserGenderAndMovie(
    movieId: string
  ): Promise<RatingReadDtosSortedByUserGender | null>;
  getRatingById(id: string): Promise<RatingReadDto | null>;
  createRating(ratingCreateDto: RatingCreateDto): Promise<RatingReadDto>;
  updateRating(ratingUpdateDto: RatingUpdateDto): Promise<RatingReadDto | null>;
}
