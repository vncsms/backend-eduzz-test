import CryptoTransactionModel from "./model/model";

interface CryptoTransactionSerializer {
    value: number
    transactionType: number
}

export function cryptoTransactionSerializer(cryptoTransaction: CryptoTransactionModel): CryptoTransactionSerializer {
    const serializer: CryptoTransactionSerializer = {
        value: cryptoTransaction.value,
        transactionType: cryptoTransaction.transactionType
    }

    return serializer;
}