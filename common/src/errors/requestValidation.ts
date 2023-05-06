import { ValidationError } from 'express-validator';
import { CustomError } from './customError';

export class RequestValidationError extends CustomError {
    statusCode = 400;

    constructor(public errors: ValidationError[]) {
        super('Invalid request validation');

        // only because we are extending a build in class
        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }

    serializeError() {
        return this.errors.map(err => {
            return { message: err.msg, field: err.param }
        });
    }

}

