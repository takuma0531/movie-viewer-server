import {
  GenreCreateDto,
  GenreReadDto,
  GenreUpdateDto,
} from "../../typings/model/genre/dto";
import { IGenreService } from "./IGenreService";
import { IGenreRepository } from "../../db/repositories/genre/IGenreRepository";
import { GenreDocument } from "src/typings/model/genre";
import { Genre } from "../../db/models/genre/genre.model";

export class GenreService implements IGenreService {
  constructor(private readonly _genreRepository: IGenreRepository) {}

  public async getAllGenres(): Promise<GenreReadDto[]> {
    try {
      const genreDocuments = await this._genreRepository.getAll();
      if (!genreDocuments) return genreDocuments;
      const genreReadDtos = genreDocuments.map((genreDocument: GenreDocument) =>
        genreDocument.toReadDto()
      );
      return genreReadDtos;
    } catch (err: any) {
      throw err;
    }
  }

  public async getGenreByName(name: string): Promise<GenreReadDto | null> {
    try {
      const genreDocument = await this._genreRepository.getByName(name);
      if (!genreDocument) return genreDocument;
      return genreDocument.toReadDto();
    } catch (err: any) {
      throw err;
    }
  }

  public async getGenreById(id: string): Promise<GenreReadDto | null> {
    try {
      const genreDocument = await this._genreRepository.getById(id);
      if (!genreDocument) return genreDocument;
      return genreDocument.toReadDto();
    } catch (err: any) {
      throw err;
    }
  }

  public async createGenre(
    genreCreateDto: GenreCreateDto
  ): Promise<GenreReadDto | null> {
    try {
      const genreDocumentToAdd = Genre.toDocument(genreCreateDto);
      const genreDocument = await this._genreRepository.add(genreDocumentToAdd);
      return genreDocument.toReadDto();
    } catch (err: any) {
      throw err;
    }
  }

  public async updateGenre(
    genreUpdateDto: GenreUpdateDto
  ): Promise<GenreReadDto | null> {
    try {
      const genreDocument = await this._genreRepository.updateById(
        genreUpdateDto.id!,
        genreUpdateDto
      );
      return genreDocument!.toReadDto();
    } catch (err: any) {
      throw err;
    }
  }

  public async deleteGenre(id: string): Promise<void> {
    try {
      await this._genreRepository.removeById(id);
    } catch (err: any) {
      throw err;
    }
  }
}
