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

      const ratingReadDtosByLte20: RatingReadDto[] = [];
      const ratingReadDtosByLte40: RatingReadDto[] = [];
      const ratingReadDtosByLet60: RatingReadDto[] = [];
      const ratingReadDtosByGte61: RatingReadDto[] = [];

      ratingReadDtos.forEach((ratingReadDto: RatingReadDto) => {
        const castedUser = ratingReadDto.user as UserDocument;
        if (castedUser.age <= 20)
          return ratingReadDtosByLte20.push(ratingReadDto);
        else if (castedUser.age <= 40)
          return ratingReadDtosByLte40.push(ratingReadDto);
        else if (castedUser.age <= 60)
          return ratingReadDtosByLet60.push(ratingReadDto);
        else return ratingReadDtosByGte61.push(ratingReadDto);
      });

      const ratingReadFilteredByUserAge: RatingReadDtosFilteredByUserAge = {
        lte20: ratingReadDtosByLte20,
        lte40: ratingReadDtosByLte40,
        lte60: ratingReadDtosByLet60,
        gte61: ratingReadDtosByGte61,
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

      const asia: RatingReadDto[] = [];
      const africa: RatingReadDto[] = [];
      const europe: RatingReadDto[] = [];
      const northAmerica: RatingReadDto[] = [];
      const southAmerica: RatingReadDto[] = [];
      const oceania: RatingReadDto[] = [];
      const antarctica: RatingReadDto[] = [];

      ratingReadDtos.forEach((ratingReadDto: RatingReadDto) => {
        const castedUser = ratingReadDto.user as UserDocument;
        if (castedUser.continent == "asia") return asia.push(ratingReadDto);
        else if (castedUser.continent == "africa")
          return africa.push(ratingReadDto);
        else if (castedUser.continent == "europe")
          return europe.push(ratingReadDto);
        else if (castedUser.continent == "northAmerica")
          return northAmerica.push(ratingReadDto);
        else if (castedUser.continent == "southAmerica")
          return southAmerica.push(ratingReadDto);
        else if (castedUser.continent == "oceania")
          return oceania.push(ratingReadDto);
        else return antarctica.push(ratingReadDto);
      });

      return {
        asia,
        africa,
        europe,
        northAmerica,
        southAmerica,
        oceania,
        antarctica,
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

      const ratingReadDtosByMale: RatingReadDto[] = [];
      const ratingReadDtosByFemale: RatingReadDto[] = [];
      const ratingReadDtosByUnknown: RatingReadDto[] = [];

      ratingReadDtos.forEach((ratingReadDto: RatingReadDto) => {
        const castedUser = ratingReadDto.user as UserDocument;
        if (castedUser.gender == Gender.MALE)
          return ratingReadDtosByMale.push(ratingReadDto);
        else if (castedUser.gender == Gender.FEMALE)
          return ratingReadDtosByFemale.push(ratingReadDto);
        else return ratingReadDtosByUnknown.push(ratingReadDto);
      });
      return {
        male: ratingReadDtosByMale,
        female: ratingReadDtosByFemale,
        unknown: ratingReadDtosByUnknown,
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
}
