import { DirectorDocument } from "../../../typings/model/director";
import { IRepository } from "../base/IRepository";

export interface IDirectorRepository extends IRepository<DirectorDocument> {
  getSomeByName(name: string): Promise<DirectorDocument[] | null>;
}
