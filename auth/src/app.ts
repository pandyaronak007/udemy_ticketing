import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cors from 'cors';
import cookieSession from 'cookie-session';
const { errorHandler, NotFoundError } = require('@rpticketing/common');

import { currentUserRouter } from './routes/currentUser';
import { signInRouter } from './routes/signIn';
import { signOutRouter } from './routes/signOut';
import { signUpRouter } from './routes/signUp';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cors());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test'
    })
)

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
})

app.use(errorHandler);

export { app };

