import express, { Request, Response } from "express";
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest, BadRequestError } from '@rpticketing/common';

import { Password } from "../services/password";
import { User } from "../models/user";

const router = express.Router();

router.post('/api/users/signIn',
    [
        body('email').isEmail()
            .withMessage('Email must be valid'),
        body('password').trim().notEmpty()
            .withMessage('You must supply password')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            throw new BadRequestError('Invalid credentials')
        }

        const passwordMatch = await Password.compare(password, existingUser.password)
        if (!passwordMatch) {
            throw new BadRequestError('Invalid credentials')
        }

        // generate jwt
        const userJwt = jwt.sign({
            id: existingUser.id,
            email: existingUser.email
        }, process.env.JWT_KEY!);

        // store it on session object
        req.session = { jwt: userJwt };

        res.status(200).send(existingUser);

    })

export { router as signInRouter };