import CryptoTransactionModel from "./model/model";
import { IResponse } from "./services/GetExecutionPriceCryptoTransaction";

interface CryptoTransactionSerializer {
    value: number
    transactionType: number
}

interface ExecutionPriceSerializer {
    sell: number,
    buy: number,
}

export function cryptoTransactionSerializer(cryptoTransaction: CryptoTransactionModel): CryptoTransactionSerializer {
    const serializer: CryptoTransactionSerializer = {
        value: cryptoTransaction.value,
        transactionType: cryptoTransaction.transactionType
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