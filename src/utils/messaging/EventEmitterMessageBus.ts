import Handler from 'utils/messaging/Handler'
import Message from 'utils/messaging/Message'
import MessageBus from 'utils/messaging/MessageBus'
import pino, { Logger } from 'pino'
import EventEmitter from './EventEmitter'

class EventEmitterMessageBus implements MessageBus {
  private _bus: EventEmitter

  private _logger: Logger

  constructor() {
    this._logger = pino()
    this._bus = new EventEmitter()
  }

  async publish(message: Message): Promise<void> {
    await this._bus.emit(message.type, message)
  }

  subscribe(type: string, handler: Handler<Message>): Promise<void> {
    this._bus.on(type, handler)
    return Promise.resolve()
  }
}

export default EventEmitterMessageBus
