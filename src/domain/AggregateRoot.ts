import Message from 'utils/messaging/Message'
import MessageBus from 'utils/messaging/MessageBus'

export default abstract class AggregateRoot {
  private _events: Message[] = []

  protected addToDomainEvents(event: Message): void {
    this._events.push(event)
  }

  public async publishDomainEvents(bus: MessageBus): Promise<void> {
    await Promise.all(this._events.map((event) => bus.publish(event)))
  }
}
