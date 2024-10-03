import UserModel from "../model/model";
import { ICreateUserDTO } from "./ICreateUserDTO";
import { ILoginnUserDTO } from "./ILoginUserDTO";

export interface IUserRepository {
    create(userData: ICreateUserDTO): Promise<UserModel>,
    login(credentials: ILoginnUserDTO): Promise<UserModel | null>
}