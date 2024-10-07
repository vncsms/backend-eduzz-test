import { inject, injectable } from "tsyringe";
import { IRequestProvider } from "../../../shared/provider/http/IRequestProvider";
import { CRYPTO_API_URL } from "../../../shared/utils/settings";

export interface IRequest {
  userId: number;
}

export interface IResponse {
  sell: number;
  buy: number;
}

@injectable()
export class GetExecutionPrice {
  constructor(
    @inject("AxiosRequestProvider") private requestProvider: IRequestProvider,
  ) {}

  public execute = async (): Promise<IResponse> => {
    const response = await this.requestProvider.sendRequest(
      CRYPTO_API_URL || "",
    );

    const executionPriceSell = parseFloat(response.data.ticker.sell);
    const executionPriceBuy = parseFloat(response.data.ticker.buy);

    return { buy: executionPriceBuy, sell: executionPriceSell };
  };
}
