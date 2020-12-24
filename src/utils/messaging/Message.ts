abstract class Message {
  private _payload: { [key: string]: any }

  get type(): string {
    return this.constructor.name
  }

  constructor(payload: { [key: string]: any}) {
    this._payload = payload
  }

  get payload(): { [key: string]: any} {
    return this._payload
  }
}

export default Message
