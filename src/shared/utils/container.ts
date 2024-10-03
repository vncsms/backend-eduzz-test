import { container } from "tsyringe";
import { IUserRepository } from "../../modules/user/repository/IUserRepository";
import { UserRepository } from "../../modules/user/repository/user";

container.registerInstance<IUserRepository>('UserRepository', new UserRepository());