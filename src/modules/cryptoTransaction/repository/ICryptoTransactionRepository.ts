import { ICreateCryptoTransactionDTO } from "./ICreateCryptoTransactionDTO";
import CryptoTransactionModel from "../model/model";
import { IListCryptoTransactionDTO } from "./IListCryptoTransactionDTO";
import { ICountCryptoTransactionDTO } from "./ICountCryptoTransactionDTO";
import { IListAllCryptoTransactionDTO } from "./IListAllCryptoTransactionDTO";
import { IChangeCryptoTransactionTypeDTO } from "./IChangeCryptoTransactionType";

export interface ICryptoTransactionRepository {
  create(
    cryptoTransactionData: ICreateCryptoTransactionDTO,
  ): Promise<CryptoTransactionModel>;
  list(listData: IListCryptoTransactionDTO): Promise<CryptoTransactionModel[]>;
  count(countData: ICountCryptoTransactionDTO): Promise<number>;
  listAllInvestments(
    listData: IListAllCryptoTransactionDTO,
  ): Promise<CryptoTransactionModel[]>;
  listAllCryptoSales(
    listData: IListAllCryptoTransactionDTO,
  ): Promise<CryptoTransactionModel[]>;
  changeCryptoTransactionType(
    updateData: IChangeCryptoTransactionTypeDTO,
  ): Promise<[affectedCount: number]>;
}
