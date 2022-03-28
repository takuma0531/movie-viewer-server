import { ArtistDocument } from "../../../typings/model/artist";
import { IRepository } from "../base/IRepository";

export interface IArtistRepository extends IRepository<ArtistDocument> {
  getSomeByName(name: string): Promise<ArtistDocument[] | null>;
}
