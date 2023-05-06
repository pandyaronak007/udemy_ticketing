import express from "express";
import { currentUser } from '@rpticketing/common'

const router = express.Router();

router.get('/api/users/currentUser',
    currentUser, (req: any, res) => {
        res.send({ currentUser: req.currentUser || null });
    })

export { router as currentUserRouter };