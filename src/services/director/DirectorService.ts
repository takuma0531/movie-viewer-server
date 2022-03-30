import { IDirectorService } from "./IDirectorService";
import {
  DirectorCreateDto,
  DirectorReadDto,
  DirectorUpdateDto,
} from "../../typings/model/director/dto";
import { DirectorDocument } from "../../typings/model/director";
import { IDirectorRepository } from "../../db/repositories/director/IDirectorRepository";
import { Director } from "../../db/models/director/director.model";

export class DirectorService implements IDirectorService {
  constructor(private readonly _directorRepository: IDirectorRepository) {}

  public async getAllDirectors(): Promise<DirectorReadDto[]> {
    try {
      const directorDocuments = await this._directorRepository.getAll();
      if (!directorDocuments) return directorDocuments;
      return this.convertDocumentsToReadDtos(directorDocuments);
    } catch (err: any) {
      throw err;
    }
  }

  public async getById(id: string): Promise<DirectorReadDto | null> {
    try {
      const directorDocument = await this._directorRepository.getById(id);
      if (!directorDocument) return directorDocument;
      return directorDocument.toReadDto();
    } catch (err: any) {
      throw err;
    }
  }

  public async getDirectorsByName(
    name: string
  ): Promise<DirectorReadDto[] | null> {
    try {
      const directorDocuments = await this._directorRepository.getSomeByName(
        name
      );
      if (!directorDocuments) return directorDocuments;
      return this.convertDocumentsToReadDtos(directorDocuments);
    } catch (err: any) {
      throw err;
    }
  }

  public async createDirector(
    directorCreateDto: DirectorCreateDto
  ): Promise<DirectorReadDto | null> {
    try {
      const directorDocumentToAdd = Director.toDocument(directorCreateDto);
      const directorDocument = await this._directorRepository.add(
        directorDocumentToAdd
      );
      const directorReadDto = directorDocument.toReadDto();
      return directorReadDto;
    } catch (err: any) {
      throw err;
    }
  }

  public async updateDirector(
    directorUpdateDto: DirectorUpdateDto
  ): Promise<DirectorReadDto | null> {
    try {
      const directorDocument = await this._directorRepository.updateById(
        directorUpdateDto.id!,
        directorUpdateDto
      );
      return directorDocument!.toReadDto();
    } catch (err: any) {
      throw err;
    }
  }

  public async deleteDirector(id: string): Promise<void> {
    try {
      await this._directorRepository.removeById(id);
    } catch (err: any) {
      throw err;
    }
  }

  private convertDocumentsToReadDtos(directorDocuments: DirectorDocument[]) {
    const directorReadDtos = directorDocuments.map(
      (directorDocument: DirectorDocument) => directorDocument.toReadDto()
    );
    return directorReadDtos;
  }
}
