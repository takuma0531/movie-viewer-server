import { MovieController } from "../controllers/MovieController";
import { MovieService } from "../services/movie/MovieService";
import { MovieRepository } from "../db/repositories/movie/MovieRepository";
import { Movie } from "../db/models/movie/movie.model";

const movieRepository = new MovieRepository(Movie);
const movieService = new MovieService(movieRepository);
export const movieController = new MovieController(movieService);