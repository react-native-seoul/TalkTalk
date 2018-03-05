import { observable } from 'mobx';
import Chat from '@models/Chat';

class LastChat extends Chat {
  @observable private _count: number;

  public get count(): number {
    return this._count;
  }

  public set count(value: number) {
    this._count = value;
  }
}

export default LastChat;
