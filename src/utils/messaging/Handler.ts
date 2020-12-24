import Message from 'utils/messaging/Message'

abstract class Handler<T extends Message> {
  abstract handle(message: T): Promise<void>
}

export default Handler
