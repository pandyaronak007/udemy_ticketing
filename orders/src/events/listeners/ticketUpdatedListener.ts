import { Message } from "node-nats-streaming";
import { Subjects, Listener, TicketUpdatedEvent } from "@rpticketing/common";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queueGroupName";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
    queueGroupName = queueGroupName;

    async onMessage(data: TicketUpdatedEvent['data'], msg: Message) {
        const ticket = await Ticket.findByEvent(data);

        if (!ticket) throw new Error('Ticket not found')

        const { title, price, version } = data;
        ticket.set({ title, price, version })
        await ticket.save()

        msg.ack();
    }
}
