import mongoose from "mongoose";
import { TicketUpdatedEvent } from "@rpticketing/common";
import { TicketUpdatedListener } from "../ticketUpdatedListener";
import { natsWrapper } from "../../../natsWrapper";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../../models/ticket";

const setup = async () => {
    // create a listener
    const listener = new TicketUpdatedListener(natsWrapper.client);

    // create and save a ticket
    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20,
    })
    await ticket.save();

    // create a fake data object
    const data: TicketUpdatedEvent['data'] = {
        id: ticket.id,
        title: 'new concert',
        price: 100,
        version: ticket.version + 1,
        userId: new mongoose.Types.ObjectId().toHexString()
    };

    // create a fake message object
    // @ts-ignore
    const msg: Message = { ack: jest.fn() };

    // return all of this stuff
    return { listener, data, msg, ticket }
}

it('finds, updated and save a ticket', async () => {
    const { listener, data, msg, ticket } = await setup();

    await listener.onMessage(data, msg);

    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket).toBeDefined();
    expect(updatedTicket.title).toEqual(data.title);
    expect(updatedTicket.price).toEqual(data.price);
    expect(updatedTicket.version).toEqual(data.version);
})

it('acks the message', async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});

it('does not call ack if the event has a skipped version', async () => {
    const { listener, data, msg, ticket } = await setup();

    data.version = 10;

    try {
        await listener.onMessage(data, msg);
    } catch (error) {

    }

    expect(msg.ack).not.toHaveBeenCalled();
})