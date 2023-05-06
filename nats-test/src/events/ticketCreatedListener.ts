import * as nats from 'node-nats-streaming';
import { Listener } from './baseListener';
import { TicketCreatedEvent } from './ticketCreatedEvent';
import { Subjects } from './subjects';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
    queueGroupName = 'payment-service';

    onMessage(data: TicketCreatedEvent['data'], msg: nats.Message) {
        console.log('Event data', data);

        msg.ack();
    }
}