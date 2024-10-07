import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { CreateTransaction } from "../services/CreateCryptoTransaction";
import {
  cryptoTransactionSerializer,
  executionPriceSerializer,
} from "../serializer";
import { validateBody } from "../../../shared/utils/validation";
import { jwtValidation } from "../../../shared/utils/tokenAuthenticator";
import {
  createCryptoTransactionValidation,
  sellCryptoTransactionValidation,
} from "../validation/transaction";
import { GetExecutionPrice } from "../services/GetExecutionPrice";
import { ListCryptoTransaction } from "../services/ListCryptoTransaction";
import { SellCryptoTransaction } from "../services/SellCryptoTrasnsaction";

export default class CryptoTransactionController {
  public async create(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const userInfo = jwtValidation(request);
      const validatedBody = await validateBody(
        createCryptoTransactionValidation,
        request,
      );

      const { quantity } = validatedBody;
      const createCryptoTransaction = container.resolve(CreateTransaction);
      const cryptoTransaction = await createCryptoTransaction.execute({
        quantity,
        userId: userInfo.id,
      });
      response.locals.data = cryptoTransactionSerializer(cryptoTransaction);
      response.locals.status = 200;
      next();
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  public async getExecutionPrice(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      jwtValidation(request);
      const getExecutionPrice = container.resolve(GetExecutionPrice);
      const executionPrice = await getExecutionPrice.execute();
      response.locals.data = executionPriceSerializer(executionPrice);
      response.locals.status = 200;
      next();
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  public async list(request: Request, response: Response, next: NextFunction) {
    try {
      const page = parseInt(request.query?.page as string) || 1;
      const limit = parseInt(request.query?.limit as string) || 10;

      const userInfo = jwtValidation(request);
      const getListCryptoTransaction = container.resolve(ListCryptoTransaction);
      const executionPrice = await getListCryptoTransaction.execute({
        userId: userInfo.id,
        page,
        limit,
      });
      response.locals.data = executionPrice;
      response.locals.status = 200;
      next();
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  public async sell(request: Request, response: Response, next: NextFunction) {
    try {
      const userInfo = jwtValidation(request);
      const validatedBody = await validateBody(
        sellCryptoTransactionValidation,
        request,
      );
      const { quantity } = validatedBody;
      const sellCryptoTransaction = container.resolve(SellCryptoTransaction);
      await sellCryptoTransaction.execute({ userId: userInfo.id, quantity });
      response.locals.data = {};
      response.locals.status = 200;
      next();
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}
