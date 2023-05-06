import { Subjects } from "./subjects";
import { Listener } from "./baseListener";

export interface TicketCreatedEvent {
    subject: Subjects.TicketCreated;
    data: {
        id: string;
        title: string;
        price: number;
    };
}