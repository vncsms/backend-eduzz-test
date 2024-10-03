interface IValidationSchema {
    field: string,
    message: string,
}

export class DetailedError extends Error {
    statusCode: number;
    schemaErrors: IValidationSchema[] | null;

    constructor(statusCode: number, schemaErrors: IValidationSchema[]) {
        super();
        this.statusCode = statusCode;
        this.schemaErrors = schemaErrors || null;
        Object.setPrototypeOf(this, DetailedError.prototype)
    }
}