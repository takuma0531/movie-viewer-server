import {
  GenreCreateDto,
  GenreReadDto,
  GenreUpdateDto,
} from "../../typings/model/genre/dto";

export interface IGenreService {
  getAllGenres(): Promise<GenreReadDto[]>;
  getGenreByName(name: string): Promise<GenreReadDto | null>;
  getGenreById(id: string): Promise<GenreReadDto | null>;
  createGenre(genreCreateDto: GenreCreateDto): Promise<GenreReadDto | null>;
  updateGenre(updateGenreDto: GenreUpdateDto): Promise<GenreReadDto | null>;
  deleteGenre(id: string): Promise<void>;
}
