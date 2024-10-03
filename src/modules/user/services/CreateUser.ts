import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../repository/IUserRepository";
import UserModel from "../model/model";

export interface IRequest {
    nome: string,
    password: string,
    email: string,
}

@injectable()
export class CreateUser {
    constructor(@inject("UserRepository") private userRepository: IUserRepository) {}

    public execute = async ({nome, password, email}: IRequest): Promise<UserModel> => {
        return this.userRepository.create({nome, password, email})
    }
}