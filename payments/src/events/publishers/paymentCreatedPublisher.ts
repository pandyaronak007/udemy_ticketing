import { Publisher, Subjects, paymentCreatedEvent } from "@rpticketing/common";

export class PaymentCreatedPublisher extends Publisher<paymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
