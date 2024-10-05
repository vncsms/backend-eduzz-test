import { IResponse } from "./service/GetExtract";
import TransactionModel from "../transaction/model/model";
import CryptoTransactionModel from "../cryptoTransaction/model/model";

interface BalanceSerializer {
    balance: number
}

interface ExtractSerializer {
    deposits: IDeposit[],
    investments: IInvestment[],
    retrieves: IInvestment[],
}

interface IDeposit {
    value: number,
    createdAt?: Date,
}

interface IInvestment {
    value: number,
    quantity: number,
    executionPrice: number,
    createdAt?: Date,
}

export function balanceSerializer(balance: number): BalanceSerializer {
    const serializer: BalanceSerializer = {balance}
    return serializer;
}

export function extractSerializer(extract: IResponse): ExtractSerializer {
    const serializer: ExtractSerializer = {
        deposits: extract.deposits.map((element: TransactionModel) => {
            return {
                value: element.value,
                createdAt: element.createdAt
            }
        }),
        investments: extract.investments.map((element: CryptoTransactionModel) => {
            return {
                value: element.value,
                createdAt: element.createdAt,
                quantity: element.quantity,
                executionPrice: element.executionPrice
            }
        }),
        retrieves: extract.retrieves.map((element: CryptoTransactionModel) => {
            return {
                value: element.value,
                createdAt: element.createdAt,
                quantity: element.quantity,
                executionPrice: element.executionPrice
            }
        }),
    }

    return serializer;
}