import CryptoTransactionModel from "./model/model";
import { IResponse } from "./services/GetExecutionPrice";

interface CryptoTransactionSerializer {
    value: number
}

interface ExecutionPriceSerializer {
    sell: number,
    buy: number,
}

export function cryptoTransactionSerializer(cryptoTransaction: CryptoTransactionModel): CryptoTransactionSerializer {
    const serializer: CryptoTransactionSerializer = {
        value: cryptoTransaction.value
    }

    return serializer;
}

export function executionPriceSerializer(executionPrice: IResponse): ExecutionPriceSerializer {
    const serializer: ExecutionPriceSerializer = {
        sell: executionPrice.sell,
        buy: executionPrice.buy
    }

    return serializer;  
}