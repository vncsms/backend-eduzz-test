import { ICreateCryptoTransactionDTO } from "./ICreateCryptoTransactionDTO";
import CryptoTransactionModel from "../model/model";
import { IListCryptoTransactionDTO } from "./IListCryptoTransactionDTO";
import { ICountCryptoTransactionDTO } from "./ICountCryptoTransactionDTO";

export interface ICryptoTransactionRepository {
    create(cryptoTransactionData: ICreateCryptoTransactionDTO): Promise<CryptoTransactionModel>,
    list(listlistData: IListCryptoTransactionDTO): Promise<CryptoTransactionModel[]>,
    count(countData: ICountCryptoTransactionDTO): Promise<number>,
}