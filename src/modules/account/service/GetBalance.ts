import { inject, injectable } from "tsyringe";
import { IAccountRepository } from "../../account/repository/IAccountRepository";
import { UnauthorizedError } from "../../error/model/model";

export interface IRequest {
    userId: number,
}

@injectable()
export class GetBalance {
    constructor(
        @inject("AccountRepository") private accountRepository: IAccountRepository
    ) {}

    public execute = async ({userId}: IRequest): Promise<number> => {
        const account = await this.accountRepository.get({userId});
        if (account?.dataValues?.balance) {
            return account.dataValues.balance;
        } else
            throw new UnauthorizedError();
    }
}