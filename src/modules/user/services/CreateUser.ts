import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../repository/IUserRepository";
import UserModel from "../model/model";
import { IAccountRepository } from "../../account/repository/IAccountRepository";
import { BaseError } from "../../error/model/model";

export interface IRequest {
    nome: string,
    password: string,
    email: string,
}

@injectable()
export class CreateUser {
    constructor(
        @inject("UserRepository") private userRepository: IUserRepository,
        @inject("AccountRepository") private accountRepository: IAccountRepository
    ) {}

    public execute = async ({nome, password, email}: IRequest): Promise<UserModel> => {
        const findUser = await this.userRepository.get({email});
        if (findUser)
            throw new BaseError(409, 'Account already exists');
        // Create new user
        const user = await this.userRepository.create({nome, password, email});
        const userId = user.id;
        // Create new account
        if (userId)
            await this.accountRepository.create({userId});
        return user;
    }
}

