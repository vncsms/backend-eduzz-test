import TransactionModel from "./model/model";

interface TransactionSerializer {
    value: number
    transactionType: number
}

export function transactionSerializer(transaction: TransactionModel): TransactionSerializer {
    const serializer: TransactionSerializer = {
        value: transaction.value,
        transactionType: transaction.transactionType
    }

    return serializer;
}