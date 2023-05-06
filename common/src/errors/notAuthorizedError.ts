import { CustomError } from "./customError";

export class NotAuthorizedError extends CustomError {
    statusCode = 401;

    constructor() {
        super('Not authorized');

        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }

    serializeError() {
        return [{ message: 'Not authorized' }]
    }
}