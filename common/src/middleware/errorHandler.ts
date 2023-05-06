import { Request, Response, NextFunction } from "express"
import { CustomError } from "../errors/customError"

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).send({ errors: err.serializeError() })
    }

    console.error('errorHandler err', err);
    res.status(400).send({
        errors: [{ message: 'Something went wrong' }]
    })
}