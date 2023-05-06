import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
    requireAuth, NotFoundError,
    NotAuthorizedError, validateRequest, BadRequestError
} from '@rpticketing/common';
import { Ticket } from '../models/ticket';
import { TicketUpdatedPublisher } from '../events/publishers/ticketUpdatedPublisher';
import { natsWrapper } from '../natsWrapper';

const router = express.Router();

router.put('/api/tickets/:id',
    requireAuth,
    [
        body('title').not().isEmpty().withMessage('Title is required'),
        body('price').isFloat({ gt: 0 })
            .withMessage('Price must be greater then zero'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const ticket = await Ticket.findById(req.params.id)

        if (!ticket) throw new NotFoundError();

        if (ticket.orderId) throw new BadRequestError('Cannot edit reserved ticket');

        if (ticket.userId !== req.currentUser.id) {
            throw new NotAuthorizedError();
        }

        ticket.set({
            title: req.body.title,
            price: req.body.price
        })

        await ticket.save();
        // push updated data in publisher
        await new TicketUpdatedPublisher(natsWrapper.client).publish({
            id: ticket.id,
            title: ticket.title,
            price: ticket.price,
            userId: ticket.userId,
            version: ticket.version
        });


        res.send(ticket);
    })

export { router as updateTicketRouter };