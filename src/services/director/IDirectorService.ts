import {
  DirectorCreateDto,
  DirectorReadDto,
  DirectorUpdateDto,
} from "../../typings/model/director/dto";

export interface IDirectorService {
  getAllDirectors(): Promise<DirectorReadDto[]>;
  getById(id: string): Promise<DirectorReadDto | null>;
  getDirectorsByName(name: string): Promise<DirectorReadDto[] | null>;
  createDirector(
    directorCreateDto: DirectorCreateDto
  ): Promise<DirectorReadDto | null>;
  updateDirector(
    directorUpdateDto: DirectorUpdateDto
  ): Promise<DirectorReadDto | null>;
  deleteDirector(id: string): Promise<void>;
}
