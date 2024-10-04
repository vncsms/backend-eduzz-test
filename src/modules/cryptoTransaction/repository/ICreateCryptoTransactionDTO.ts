export interface ICreateCryptoTransactionDTO {
    value: number;
    accountId: number;
    quantity: number;
    transactionType: number;
    executionPrice: number;
}