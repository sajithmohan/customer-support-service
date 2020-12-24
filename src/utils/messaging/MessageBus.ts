import Message from './Message'
import Handler from './Handler'

abstract class MessageBus {
  abstract publish(message: Message): Promise<void>

  abstract subscribe(type: string, handler: Handler<Message>): Promise<void>
}
export default MessageBus
