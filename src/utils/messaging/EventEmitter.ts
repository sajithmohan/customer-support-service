/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import Handler from 'utils/messaging/Handler'
import Message from 'utils/messaging/Message'

class EventEmitter {
  private _bindings: {[item: string]: Handler<Message>[] }

  constructor() {
    this._bindings = {}
  }

  on(key: string, handler:Handler<Message>): void {
    if (!(key in this._bindings)) {
      this._bindings[key] = []
    }
    this._bindings[key].push(handler)
  }

  async emit(key: string, message: Message): Promise<void> {
    if (!(key in this._bindings)) {
      return
    }
    await Promise.all(
      this._bindings[key].map((handler) => handler.handle.bind(handler)(message)),
    )
  }
}

export default EventEmitter
