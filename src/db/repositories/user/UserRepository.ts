import { UserDocument } from "../../../typings/model/user";
import { Repository } from "../base/Repository";
import { IUserRepository } from "./IUserRepository";

export class UserRepository
  extends Repository<UserDocument>
  implements IUserRepository
{
  public async getSomeByName(name: string): Promise<UserDocument[] | null> {
    try {
      const users = await this._model.find({ name });
      return users;
    } catch (err: any) {
      throw err;
    }
  }
}
