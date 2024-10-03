import UserModel from "../model/model";
import { ICreateUserDTO } from "./ICreateUserDTO";

export interface IUserRepository {
    create(userData: ICreateUserDTO): Promise<UserModel>,
}