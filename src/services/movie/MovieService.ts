import { IMovieService } from "./IMovieService";
import {
  MovieCreateDto,
  MovieReadDto,
  MovieUpdateDto,
} from "../../typings/model/movie/dto";
import { IMovieRepository } from "../../db/repositories/movie/IMovieRepository";
import { Movie } from "../../db/models/movie/movie.model";
import { MovieDocument } from "../../typings/model/movie";
import { IDirectorService } from "../director/IDirectorService";
import { IArtistService } from "../artist/IArtistService";
import { DirectorDocument } from "../../typings/model/director";
import { ArtistDocument } from "../../typings/model/artist";

export class MovieService implements IMovieService {
  constructor(
    private readonly _movieRepository: IMovieRepository,
    private readonly _directorService: IDirectorService,
    private readonly _artistService: IArtistService
  ) {}

  public async getAllMovies(): Promise<MovieReadDto[]> {
    try {
      const movieDocuments = await this._movieRepository.getAll();
      if (!movieDocuments) return movieDocuments;
      return this.convertDocumentsToReadDtos(movieDocuments);
    } catch (err: any) {
      throw err;
    }
  }

  public async getMovieById(id: string): Promise<MovieReadDto | null> {
    try {
      const movieDocument = await this._movieRepository.getById(id);
      if (!movieDocument) return movieDocument;
      return movieDocument.toReadDto();
    } catch (err: any) {
      throw err;
    }
  }

  public async getMoviesByTitle(title: string): Promise<MovieReadDto[] | null> {
    try {
      const movieDocuments = await this._movieRepository.getSomeByTitle(title);
      if (!movieDocuments) return movieDocuments;
      return this.convertDocumentsToReadDtos(movieDocuments);
    } catch (err: any) {
      throw err;
    }
  }

  public async getMovieByTitle(title: string): Promise<MovieCreateDto | null> {
    try {
      const movieDocument = await this._movieRepository.getByTitle(title);
      if (!movieDocument) return movieDocument;
      return movieDocument.toReadDto();
    } catch (err: any) {
      throw err;
    }
  }

  public async getLastestMovies(limit: number): Promise<MovieReadDto[] | null> {
    try {
      const movieDocuments = await this._movieRepository.getSomeLatest(limit);
      if (!movieDocuments) return movieDocuments;
      return this.convertDocumentsToReadDtos(movieDocuments);
    } catch (err: any) {
      throw err;
    }
  }

  public async createMovie(
    movieCreateDto: MovieCreateDto
  ): Promise<MovieReadDto> {
    try {
      const castedDirector = movieCreateDto.director as DirectorDocument;
      if (castedDirector.name) {
        const directorReadDto = await this._directorService.createDirector(
          movieCreateDto.director as DirectorDocument
        );
        movieCreateDto.director = directorReadDto?.id as string;
      }

      const castedArtists = movieCreateDto.artists as ArtistDocument[];

      TODO: // foreach execution should be waited
      castedArtists.forEach(async (artist: ArtistDocument, index: number) => {
        if (artist.name) {
          const artistReadDto = await this._artistService.createArtist(artist);
          movieCreateDto.artists[index] = artistReadDto.id as string;
          console.log("foreach...");
          console.log(artistReadDto.id);
        }
      });
      console.log(movieCreateDto.artists);

      const movieDocumentToAdd = Movie.toDocument(movieCreateDto);
      const movieDocument = await this._movieRepository.add(movieDocumentToAdd);
      const movieReadDto = movieDocument.toReadDto();
      return movieReadDto;
    } catch (err: any) {
      throw err;
    }
  }

  public async updateMovie(
    movieUpdateDto: MovieUpdateDto
  ): Promise<MovieReadDto> {
    try {
      const movieDocument = await this._movieRepository.updateById(
        movieUpdateDto.id!,
        movieUpdateDto
      );
      return movieDocument!.toReadDto();
    } catch (err: any) {
      throw err;
    }
  }

  public async deleteMovie(id: string): Promise<void> {
    try {
      await this._movieRepository.removeById(id);
    } catch (err: any) {
      throw err;
    }
  }

  private convertDocumentsToReadDtos(movieDocuments: MovieDocument[]) {
    const movieReadDtos = movieDocuments.map((movieDocument: MovieDocument) =>
      movieDocument.toReadDto()
    );
    return movieReadDtos;
  }
}
