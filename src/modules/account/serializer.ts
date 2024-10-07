import { IResponse } from "./service/GetExtract";
import TransactionModel from "../transaction/model/model";
import CryptoTransactionModel from "../cryptoTransaction/model/model";
import { IResponseGetVolume } from "./service/GetVolume";

interface BalanceSerializer {
  balance: number;
}

interface VolumeSerializer {
  bought: number;
  sold: number;
}

interface ExtractSerializer {
  deposits: IDeposit[];
  investments: IInvestment[];
  cryptoSales: IInvestment[];
}

interface IDeposit {
  value: number;
  createdAt?: Date;
}

interface IInvestment {
  value: number;
  quantity: number;
  executionPrice: number;
  createdAt?: Date;
}

export function balanceSerializer(balance: number): BalanceSerializer {
  const serializer: BalanceSerializer = { balance };
  return serializer;
}

export function extractSerializer(extract: IResponse): ExtractSerializer {
  const serializer: ExtractSerializer = {
    deposits: extract.deposits.map((element: TransactionModel) => {
      return {
        value: element.value,
        createdAt: element.createdAt,
      };
    }),
    investments: extract.investments.map((element: CryptoTransactionModel) => {
      return {
        value: element.value,
        createdAt: element.createdAt,
        quantity: element.quantity,
        executionPrice: element.executionPrice,
      };
    }),
    cryptoSales: extract.cryptoSales.map((element: CryptoTransactionModel) => {
      return {
        value: element.value,
        createdAt: element.createdAt,
        quantity: element.quantity,
        executionPrice: element.executionPrice,
      };
    }),
  };

  return serializer;
}

export function volumeSerializer(volume: IResponseGetVolume): VolumeSerializer {
  const serializer: VolumeSerializer = {
    bought: volume.bought,
    sold: volume.sold,
  };

  return serializer;
}
