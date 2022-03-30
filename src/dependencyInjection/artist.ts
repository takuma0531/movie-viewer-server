import { ArtistController } from "../controllers/ArtistController";
import { ArtistService } from "../services/artist/ArtistService";
import { ArtistRepository } from "../db/repositories/artist/ArtistRepository";
import { Artist } from "../db/models/artist/artist.model";

export const artistRepository = new ArtistRepository(Artist);
export const artistService = new ArtistService(artistRepository);
export const artistController = new ArtistController(artistService);
