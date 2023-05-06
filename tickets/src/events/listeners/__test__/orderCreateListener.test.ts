import mongoose from "mongoose";
import { OrderCreatedEvent, OrderStatus } from "@rpticketing/common";
import { OrderCreatedListener } from "../orderCreateListener";
import { natsWrapper } from "../../../natsWrapper";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../../models/ticket";

const setup = async () => {
    // create an instance of the listener
    const listener = new OrderCreatedListener(natsWrapper.client);

    // create and save a ticket
    const ticket = Ticket.build({
        // id: new mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20,
        userId: new mongoose.Types.ObjectId().toHexString(),
    })
    await ticket.save();

    // create a fake data event
    const data: OrderCreatedEvent['data'] = {
        id: new mongoose.Types.ObjectId().toHexString(),
        version: 0,
        status: OrderStatus.Created,
        userId: new mongoose.Types.ObjectId().toHexString(),
        expiresAt: 'asksdfa',
        ticket: {
            id: ticket.id,
            price: ticket.price
        }
    };

    // create a fake message object
    // @ts-ignore
    const msg: Message = { ack: jest.fn() };

    return { listener, data, msg, ticket }
}

it('sets the userId of the ticket', async () => {
    const { listener, data, msg, ticket } = await setup();

    await listener.onMessage(data, msg);

    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket).toBeDefined();
    expect(updatedTicket.orderId).toEqual(data.id);

});

it('acks the message', async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});

it('publishes a ticket updated event', async () => {
    const { listener, data, msg, ticket } = await setup();

    await listener.onMessage(data, msg);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
    // expect(msg.ack).toHaveBeenCalled();

    // @ts-ignore alterative step 1
    // console.log(natsWrapper.client.publish.mock.calls[0][1])
    // or
    const ticketUpdatedData = JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[0][1]);

    expect(data.id).toEqual(ticketUpdatedData.orderId);
});