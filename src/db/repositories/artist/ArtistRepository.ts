import { ArtistDocument } from "../../../typings/model/artist";
import { Repository } from "../base/Repository";
import { IArtistRepository } from "./IArtistRepository";

export class ArtistRepository
  extends Repository<ArtistDocument>
  implements IArtistRepository
{
  public async getSomeByName(name: string): Promise<ArtistDocument[] | null> {
    try {
      const artists = await this._model.find({
        name: { $regex: "^" + name, $options: "i" },
      });
      return artists;
    } catch (err: any) {
      throw err;
    }
  }
}
