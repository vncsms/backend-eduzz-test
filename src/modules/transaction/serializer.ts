import TransactionModel from "./model/model";

interface TransactionSerializer {
  value: number;
}

export function transactionSerializer(
  transaction: TransactionModel,
): TransactionSerializer {
  const serializer: TransactionSerializer = {
    value: transaction.value,
  };

  return serializer;
}
