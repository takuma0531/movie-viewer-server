import { DirectorController } from "../controllers/DirectorController";
import { DirectorService } from "../services/director/DirectorService";
import { DirectorRepository } from "../db/repositories/director/DirectorRepository";
import { Director } from "../db/models/director/director.model";

export const directorRepository = new DirectorRepository(Director);
export const directorService = new DirectorService(directorRepository);
export const directorController = new DirectorController(directorService);
