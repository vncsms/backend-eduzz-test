import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../repository/IUserRepository";
import jwt from 'jsonwebtoken';
import { JWT_KEY, TOKEN_LIFESPAN } from "../../../shared/utils/settings";

export interface IRequest {
    password: string,
    email: string,
}

@injectable()
export class LoginUser {
    constructor(@inject("UserRepository") private userRepository: IUserRepository) {}

    public execute = async ({password, email}: IRequest): Promise<string | null> => {
        const user = await this.userRepository.login({password, email});
        return user ? jwt.sign(user.dataValues, JWT_KEY || '', { expiresIn: TOKEN_LIFESPAN }) : null;
    }
}