import { Publisher, Subjects, TicketUpdatedEvent } from '@mytuts/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
