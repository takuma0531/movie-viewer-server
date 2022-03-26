import { UserDocument } from "../../../typings/model/user";
import { IRepository } from "../base/IRepository";

export interface IUserRepository extends IRepository<UserDocument> {
  getSomeByName(name: string): Promise<UserDocument[] | null>;
  getByEmail(email: string): Promise<UserDocument | null>;
}
