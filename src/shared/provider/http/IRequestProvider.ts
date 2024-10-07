import { ICurrencyResponse } from "./ICurrencyResponse";

export interface IRequestProvider {
    sendRequest(url: string): Promise<ICurrencyResponse>,
}