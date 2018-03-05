import {
  date,
  object,
  identifier,
  serializable,
} from 'serializr';

import { observable } from 'mobx';

class User {
  @observable private _uid: string;
  @observable private _photoURL: string;
  @observable private _displayName: string;
  @observable private _statusMsg: string;

  public get uid(): string {
    return this._uid;
  }

  public set uid(value: string) {
    this._uid = value;
  }

  public get photoURL(): string {
    return this._photoURL;
  }

  public set photoURL(value: string) {
    this._photoURL = value;
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
