import { observable } from 'mobx';
import LastChat from '@models/LastChat';

class Chatroom {
  @observable private _members: string[];
  @observable private _lastChat: LastChat;

  public get members(): string[] {
    return this._members;
  }

  public set members(value: string[]) {
    this._members = value;
  }

  public get lastChat(): LastChat {
    return this._lastChat;
  }

  public set lastChat(value: LastChat) {
    this._lastChat = value;
  }
}

export default Chatroom;
