import { IArtistService } from "./IArtistService";
import {
  ArtistReadDto,
  ArtistCreateDto,
  ArtistUpdateDto,
} from "../../typings/model/artist/dto";
import { IArtistRepository } from "../../db/repositories/artist/IArtistRepository";
import { Artist } from "../../db/models/artist/artist.model";

export class ArtistService implements IArtistService {
  constructor(private readonly _artistRepository: IArtistRepository) {}

  public async getAllArtists(): Promise<ArtistReadDto[]> {
    try {
      const artistReadDtos = await this._artistRepository.getAll();
      return artistReadDtos;
    } catch (err: any) {
      throw err;
    }
  }

  public async getArtistsByName(name: string): Promise<ArtistReadDto[] | null> {
    try {
      const artistReadDtos = await this._artistRepository.getSomeByName(name);
      return artistReadDtos;
    } catch (err: any) {
      throw err;
    }
  }

  public async createArtist(
    artistCreateDto: ArtistCreateDto
  ): Promise<ArtistReadDto> {
    try {
      const artistDocumentToAdd = Artist.toDocument(artistCreateDto);
      const artistDocument = await this._artistRepository.add(
        artistDocumentToAdd
      );
      const artistReadDto = artistDocument.toReadDto();
      return artistReadDto;
    } catch (err: any) {
      throw err;
    }
  }

  public async updateArtist(
    artistUpdateDto: ArtistUpdateDto
  ): Promise<ArtistReadDto> {
    try {
      const artistDocument = await this._artistRepository.updateById(
        artistUpdateDto.id!,
        artistUpdateDto
      );
      return artistDocument!.toReadDto();
    } catch (err: any) {
      throw err;
    }
  }

  public async deleteArtist(id: string): Promise<void> {
    try {
      await this._artistRepository.removeById(id);
    } catch (err: any) {
      throw err;
    }
  }
}
