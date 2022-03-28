import { GenreDocument } from "../../../typings/model/genre";
import { Repository } from "../base/Repository";
import { IGenreRepository } from "./IGenreRepository";

export class GenreRepository
  extends Repository<GenreDocument>
  implements IGenreRepository
{
  public async getByName(name: string): Promise<GenreDocument | null> {
    try {
      const genre = await this._model.findOne({ name });
      return genre;
    } catch (err: any) {
      throw err;
    }
  }
}
