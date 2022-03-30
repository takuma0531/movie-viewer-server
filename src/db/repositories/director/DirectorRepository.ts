import { DirectorDocument } from "../../../typings/model/director";
import { Repository } from "../base/Repository";
import { IDirectorRepository } from "./IDirectorRepository";

export class DirectorRepository
  extends Repository<DirectorDocument>
  implements IDirectorRepository
{
  public async getSomeByName(name: string): Promise<DirectorDocument[] | null> {
    try {
      const directors = await this._model.find({
        name: { $regex: "^" + name, $options: "i" },
      });
      return directors;
    } catch (err: any) {
      throw err;
    }
  }
}
