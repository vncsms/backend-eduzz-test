import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../repository/IUserRepository";
import jwt from 'jsonwebtoken';
import { JWT_KEY } from "../../../shared/utils/settings";

export interface IRequest {
    password: string,
    email: string,
}

@injectable()
export class LoginUser {
    constructor(@inject("UserRepository") private userRepository: IUserRepository) {}

    public execute = async ({password, email}: IRequest): Promise<string | null> => {
        const user = await this.userRepository.login({password, email});
        return user ? jwt.sign(user.dataValues, JWT_KEY || 'secret', { expiresIn: '1h' }) : null;
    }
}