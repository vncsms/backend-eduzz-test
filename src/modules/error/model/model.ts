interface IValidationSchema {
    field: string,
    message: string,
}

export class BaseError extends Error {
    statusCode: number;
    messageError: string;

    constructor(statusCode: number, messageError: string) {
        super();
        this.statusCode = statusCode;
        this.messageError = messageError;
        Object.setPrototypeOf(this, BaseError.prototype)
    }
}

export class UnauthorizedError extends BaseError {
    constructor () {
        super(401, 'Unauthorized');
    }
}

export class ConflictError extends BaseError {
    constructor () {
        super(409, 'Conflict');
    }
}

export class InternalError extends BaseError {
    constructor () {
        super(500, 'Internal Server Error');
    }
}
