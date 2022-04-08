import { IRatingService } from "./IRatingService";
import {
  RatingCreateDto,
  RatingReadDto,
  RatingUpdateDto,
  RatingReadDtosFilteredByUserAge,
  RatingReadDtosFilteredByUserLocation,
  RatingReadDtosSortedByUserGender,
} from "../../typings/model/rating/dto";
import { Rating } from "../../db/models/rating/rating.model";
import { IRatingRepository } from "../../db/repositories/rating/IRatingRepository";
import { RatingDocument } from "../../typings/model/rating";
import { UserDocument } from "../../typings/model/user";
import { Gender } from "../../enums/Gender";

export class RatingService implements IRatingService {
  constructor(private readonly _ratingRepository: IRatingRepository) {}

  public async getRatingsByMovie(
    movieId: string
  ): Promise<RatingReadDto[] | null> {
    try {
      const ratingDocuments = await this._ratingRepository.getSomeByMovie(
        movieId
      );
      if (!ratingDocuments) return ratingDocuments;
      const ratingReadDtos = ratingDocuments.map(
        (ratingDocument: RatingDocument) => ratingDocument.toReadDto()
      );
      return ratingReadDtos;
    } catch (err: any) {
      throw err;
    }
  }

  public async filterRatingsByUserAtSpecificAgeAndMovie(
    movieId: string
  ): Promise<RatingReadDtosFilteredByUserAge | null> {
    try {
      const ratingReadDtos = await this.getRatingsByMovie(movieId);
      if (!ratingReadDtos) return ratingReadDtos;

      const ratingByLte20: number[] = [];
      const ratingByLte40: number[] = [];
      const ratingByLet60: number[] = [];
      const ratingByGte61: number[] = [];

      ratingReadDtos.forEach((ratingReadDto: RatingReadDto) => {
        const castedUser = ratingReadDto.user as UserDocument;
        if (castedUser.age <= 20)
          return ratingByLte20.push(ratingReadDto.point);
        else if (castedUser.age <= 40)
          return ratingByLte40.push(ratingReadDto.point);
        else if (castedUser.age <= 60)
          return ratingByLet60.push(ratingReadDto.point);
        else return ratingByGte61.push(ratingReadDto.point);
      });

      const ratingReadFilteredByUserAge: RatingReadDtosFilteredByUserAge = {
        lte20: this.returnAverageRating(ratingByLte20),
        lte40: this.returnAverageRating(ratingByLte40),
        lte60: this.returnAverageRating(ratingByLet60),
        gte61: this.returnAverageRating(ratingByGte61),
      };
      return ratingReadFilteredByUserAge;
    } catch (err: any) {
      throw err;
    }
  }

  public async filterRatingsByUserInSpecificContinentAndMovie(
    movieId: string
  ): Promise<RatingReadDtosFilteredByUserLocation | null> {
    try {
      const ratingReadDtos = await this.getRatingsByMovie(movieId);
      if (!ratingReadDtos) return ratingReadDtos;

      const asia: number[] = [];
      const africa: number[] = [];
      const europe: number[] = [];
      const northAmerica: number[] = [];
      const southAmerica: number[] = [];
      const oceania: number[] = [];
      const antarctica: number[] = [];

      ratingReadDtos.forEach((ratingReadDto: RatingReadDto) => {
        const castedUser = ratingReadDto.user as UserDocument;
        if (castedUser.continent == "asia")
          return asia.push(ratingReadDto.point);
        else if (castedUser.continent == "africa")
          return africa.push(ratingReadDto.point);
        else if (castedUser.continent == "europe")
          return europe.push(ratingReadDto.point);
        else if (castedUser.continent == "northAmerica")
          return northAmerica.push(ratingReadDto.point);
        else if (castedUser.continent == "southAmerica")
          return southAmerica.push(ratingReadDto.point);
        else if (castedUser.continent == "oceania")
          return oceania.push(ratingReadDto.point);
        else return antarctica.push(ratingReadDto.point);
      });

      return {
        asia: this.returnAverageRating(asia),
        africa: this.returnAverageRating(africa),
        europe: this.returnAverageRating(europe),
        northAmerica: this.returnAverageRating(northAmerica),
        southAmerica: this.returnAverageRating(southAmerica),
        oceania: this.returnAverageRating(oceania),
        antarctica: this.returnAverageRating(antarctica),
      };
    } catch (err: any) {
      throw err;
    }
  }

  public async sortRatingsByUserGenderAndMovie(
    movieId: string
  ): Promise<RatingReadDtosSortedByUserGender | null> {
    try {
      const ratingReadDtos = await this.getRatingsByMovie(movieId);
      if (!ratingReadDtos) return null;

      const ratingByMale: number[] = [];
      const ratingByFemale: number[] = [];
      const ratingByUnknown: number[] = [];

      ratingReadDtos.forEach((ratingReadDto: RatingReadDto) => {
        const castedUser = ratingReadDto.user as UserDocument;
        if (castedUser.gender == Gender.MALE)
          return ratingByMale.push(ratingReadDto.point);
        else if (castedUser.gender == Gender.FEMALE)
          return ratingByFemale.push(ratingReadDto.point);
        else return ratingByUnknown.push(ratingReadDto.point);
      });
      return {
        male: this.returnAverageRating(ratingByMale),
        female: this.returnAverageRating(ratingByFemale),
        unknown: this.returnAverageRating(ratingByUnknown),
      };
    } catch (err: any) {
      throw err;
    }
  }

  public async getRatingById(id: string): Promise<RatingReadDto | null> {
    try {
      const ratingReadDto = await this._ratingRepository.getById(id);
      return ratingReadDto;
    } catch (err: any) {
      throw err;
    }
  }

  public async createRating(
    ratingCreateDto: RatingCreateDto
  ): Promise<RatingReadDto> {
    try {
      const ratingDocumentToAdd = Rating.toDocument(ratingCreateDto);
      const ratingDocument = await this._ratingRepository.add(
        ratingDocumentToAdd
      );
      return ratingDocument.toReadDto();
    } catch (err: any) {
      throw err;
    }
  }

  public async updateRating(
    ratingUpdateDto: RatingUpdateDto
  ): Promise<RatingReadDto | null> {
    try {
      const ratingDocument = await this._ratingRepository.updateById(
        ratingUpdateDto.id!,
        ratingUpdateDto
      );
      return ratingDocument!.toReadDto();
    } catch (err: any) {
      throw err;
    }
  }

  private returnAverageRating(ratings: number[]): number {
    const average =
      ratings.reduce((prev, curr) => prev + curr) / ratings.length;
    return average;
  }
}
