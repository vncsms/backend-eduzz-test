import axios from "axios";
import { IRequestProvider } from "./IRequestProvider";
import { ICurrencyResponse } from "./ICurrencyResponse";

export class AxiosRequestProvider implements IRequestProvider {
  public sendRequest = async (url: string): Promise<ICurrencyResponse> => {
    return axios.get(url);
  };
}
