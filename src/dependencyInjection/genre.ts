import { Genre } from "../db/models/genre/genre.model";
import { GenreRepository } from "../db/repositories/genre/GenreRepository";
import { GenreService } from "../services/genre/GenreService";
import { GenreController } from "../controllers/GenreController";

export const genreRepository = new GenreRepository(Genre);
export const genreService = new GenreService(genreRepository);
export const genreController = new GenreController(genreService);
