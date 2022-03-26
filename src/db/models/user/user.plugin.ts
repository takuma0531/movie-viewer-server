import { Schema } from "mongoose";
import { UserDocument } from "../../../typings/model/user";
import { UserReadDto, UserCreateDto } from "../../../typings/model/user/dto";

export const userPlugin = (userSchema: Schema<UserDocument>) => {
  userSchema.static(
    "toDocument",
    function (userCreateDto: UserCreateDto): UserDocument {
      return new this(userCreateDto);
    }
  );

  userSchema.method("toReadDto", function (): UserReadDto {
    const userReadDto: UserReadDto = {
      id: this._id,
      email: this.email,
      name: this.name,
      country: this.country,
      continent: this.continent,
      role: this.role,
      age: this.age,
    };
    return userReadDto;
  });
};
