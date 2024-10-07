import { ObjectSchema } from "yup";
import { Request } from "express";
import { BaseError } from "../../modules/error/model/model";

export const validateBody = async (validationFunc: ObjectSchema<any>, request: Request): Promise<any> => {
    const validateBody = await validationFunc.validate(request.body, { abortEarly: false }).catch(errors => {
        const schemaErrors = errors.inner.map((err: any) => {
            return { field: err.path, message: err.message };
        })
        throw new BaseError (
            409,
            JSON.stringify(schemaErrors)
        )
    })
    return validateBody;
}