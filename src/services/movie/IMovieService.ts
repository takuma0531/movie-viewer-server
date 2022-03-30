import { MovieDocument } from "src/typings/model/movie";
import {
  MovieCreateDto,
  MovieReadDto,
  MovieUpdateDto,
} from "../../typings/model/movie/dto";

export interface IMovieService {
  getAllMovies(): Promise<MovieReadDto[]>;
  getMovieById(id: string): Promise<MovieReadDto | null>;
  getMoviesByTitle(title: string): Promise<MovieReadDto[] | null>;
  getMovieByTitle(title: string): Promise<MovieCreateDto | null>;
  getLastestMovies(limit: number): Promise<MovieReadDto[] | null>;
  createMovie(movieCreateDto: MovieCreateDto): Promise<MovieReadDto>;
  updateMovie(movieUpdateDto: MovieUpdateDto): Promise<MovieReadDto>;
  deleteMovie(id: string): Promise<void>;
}
