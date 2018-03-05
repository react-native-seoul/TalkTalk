import { observable } from 'mobx';

class Chat {
  @observable private _uid: string;
  @observable private _sender: string[];
  @observable private _photoURL: string[];
  @observable private _message: string[];
  @observable private _date: string[];

  public get uid(): string {
    return this._uid;
  }

  public set uid(value: string) {
    this._uid = value;
  }

  public get sender(): string[] {
    return this._sender;
  }

  public set sender(value: string[]) {
    this._sender = value;
  }

  public get photoURL(): string[] {
    return this._photoURL;
  }

  public set photoURL(value: string[]) {
    this._photoURL = value;
  }

  public get message(): string[] {
    return this._message;
  }

  public set message(value: string[]) {
    this._message = value;
  }

  public get date(): string[] {
    return this._date;
  }

  public set date(value: string[]) {
    this._date = value;
  }
}

export default Chat;
