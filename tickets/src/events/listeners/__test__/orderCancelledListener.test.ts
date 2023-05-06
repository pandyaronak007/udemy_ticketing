import mongoose from "mongoose";
import { OrderCancelledEvent } from "@rpticketing/common";
import { OrderCancelledListener } from "../orderCancelledListener";
import { natsWrapper } from "../../../natsWrapper";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../../models/ticket";

const setup = async () => {
    // create an instance of the listener
    const listener = new OrderCancelledListener(natsWrapper.client);

    const orderId = new mongoose.Types.ObjectId().toHexString()
    // create and save a ticket
    const ticket = Ticket.build({
        title: 'concert',
        price: 20,
        userId: new mongoose.Types.ObjectId().toHexString(),
    })
    ticket.set({ orderId });
    await ticket.save();

    // create a fake data event
    const data: OrderCancelledEvent['data'] = {
        id: new mongoose.Types.ObjectId().toHexString(),
        version: 0,
        ticket: { id: ticket.id }
    };

    // create a fake message object
    // @ts-ignore
    const msg: Message = { ack: jest.fn() };

    return { listener, data, msg, ticket, orderId }
}

it('updates the ticket publish an event', async () => {
    const { listener, data, msg, ticket, orderId } = await setup();

    await listener.onMessage(data, msg);

    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket.orderId).not.toBeDefined();
    expect(msg.ack).toHaveBeenCalled();
    expect(natsWrapper.client.publish).toHaveBeenCalled();

});


