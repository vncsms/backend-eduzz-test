import { inject, injectable } from "tsyringe";
import { IAccountRepository } from "../../account/repository/IAccountRepository";
import { UnauthorizedError } from "../../error/model/model";
import { IRequestProvider } from "../../../shared/provider/http/IRequestProvider";

export interface IRequest {
    userId: number,
}

export interface IResponse {
    sell: number,
    buy: number,
}

@injectable()
export class GetExecutionPrice {
    constructor(
        @inject("AxiosRequestProvider") private requestProvider: IRequestProvider,
        @inject("AccountRepository") private accountRepository: IAccountRepository,
    ) {}

    public execute = async ({userId}: IRequest): Promise<IResponse> => {
        const account = await this.accountRepository.get({userId});

        if (!account?.dataValues.balance) {
            throw new UnauthorizedError();
        }

        const response = await this.requestProvider.sendRequest('https://www.mercadobitcoin.net/api/BTC/ticker/');

        const executionPriceSell = parseFloat(response.data.ticker.sell);
        const executionPriceBuy = parseFloat(response.data.ticker.buy);

        return {buy: executionPriceBuy, sell: executionPriceSell};
    }
}
