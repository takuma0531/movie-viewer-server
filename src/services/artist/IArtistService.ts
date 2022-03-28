import {
  ArtistReadDto,
  ArtistCreateDto,
  ArtistUpdateDto,
} from "../../typings/model/artist/dto";

export interface IArtistService {
  getAllArtists(): Promise<ArtistReadDto[]>;
  getArtistsByName(name: string): Promise<ArtistReadDto[] | null>;
  createArtist(artistCreateDto: ArtistCreateDto): Promise<ArtistReadDto>;
  updateArtist(artistUpdateDto: ArtistUpdateDto): Promise<ArtistReadDto>;
  deleteArtist(id: string): Promise<void>;
}
