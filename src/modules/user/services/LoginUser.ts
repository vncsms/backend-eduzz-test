import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../repository/IUserRepository";
import jwt from "jsonwebtoken";
import { JWT_KEY } from "../../../shared/utils/settings";
import bcrypt from "bcrypt";
import { BaseError } from "../../error/model/model";

export interface IRequest {
  password: string;
  email: string;
}

@injectable()
export class LoginUser {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository,
  ) {}

  public execute = async ({
    password,
    email,
  }: IRequest): Promise<string | null> => {
    const user = await this.userRepository.login({ email });

    if (!user) throw new BaseError(400, "Couldn’t find your account");

    const match = await bcrypt.compare(password, user.password);

    if (!match) throw new BaseError(400, "Invalid password");

    return user ? jwt.sign(user.dataValues, JWT_KEY || "") : null;
  };
}
