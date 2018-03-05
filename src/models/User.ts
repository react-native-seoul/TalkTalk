import {
  date,
  object,
  identifier,
  serializable,
} from 'serializr';

import { observable } from 'mobx';

class User {
  @observable private _uid: string;
  @observable private _img: string;
  @observable private _displayName: string;
  @observable private _statusMsg: string;

  public get uid(): string {
    return this._uid;
  }

  public set uid(value: string) {
    this._uid = value;
  }

  public get img(): string {
    return this._img;
  }

  public set img(value: string) {
    this._img = value;
  }

  public get displayName(): string {
    return this._displayName;
  }

  public set displayName(value: string) {
    this._displayName = value;
  }

  public get statusMsg(): string {
    return this._statusMsg;
  }

  public set statusMsg(value: string) {
    this._statusMsg = value;
  }
}

export default User;
