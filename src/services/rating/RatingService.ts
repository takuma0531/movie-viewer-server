import { IRatingService } from "./IRatingService";
import {
  RatingCreateDto,
  RatingReadDto,
  RatingUpdateDto,
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

  // TODO: fix later TODO: like gender function
  public async filterRatingsByUserAtSpecificAgeAndMovie(
    movieId: string,
    minAge: number,
    maxAge: number
  ): Promise<RatingReadDto[] | null> {
    try {
      const ratingReadDtos = await this.getRatingsByMovie(movieId);
      if (!ratingReadDtos) return ratingReadDtos;
      const filteredRatingReadDtos = ratingReadDtos.filter(
        (ratingReadDto: RatingReadDto) => {
          const user = ratingReadDto.user as UserDocument;
          if (user.age >= minAge || user.age <= maxAge) return true;
          else return false;
        }
      );
      return filteredRatingReadDtos;
    } catch (err: any) {
      throw err;
    }
  }

  // fix later TODO: like gender function
  public async filterRatingsByUserInSpecificContinentAndMovie(
    movieId: string,
    continent: string
  ): Promise<RatingReadDto[] | null> {
    try {
      const ratingReadDtos = await this.getRatingsByMovie(movieId);
      if (!ratingReadDtos) return ratingReadDtos;
      const filteredRatingReadDtos = ratingReadDtos.filter(
        (ratingReadDto: RatingReadDto) => {
          const user = ratingReadDto.user as UserDocument;
          if (user.continent == continent) return true;
          else return false;
        }
      );
      return filteredRatingReadDtos;
    } catch (err: any) {
      throw err;
    }
  }

  public async sortRatingsByUserGenderAndMovie(movieId: string): Promise<{
    male: RatingReadDto[];
    female: RatingReadDto[];
    unknown: RatingReadDto[];
  } | null> {
    try {
      const ratingReadDtos = await this.getRatingsByMovie(movieId);
      if (!ratingReadDtos) return null;

      const ratingReadDtosByMale: RatingReadDto[] = [];
      const ratingReadDtosByFemale: RatingReadDto[] = [];
      const ratingReadDtosByUnknown: RatingReadDto[] = [];

      ratingReadDtos.forEach((ratingReadDto: RatingReadDto) => {
        const castedUser = ratingReadDto.user as UserDocument;
        if (castedUser.gender == Gender.MALE)
          ratingReadDtosByMale.push(ratingReadDto);
        else if (castedUser.gender == Gender.FEMALE)
          ratingReadDtosByFemale.push(ratingReadDto);
        else ratingReadDtosByUnknown.push(ratingReadDto);
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
