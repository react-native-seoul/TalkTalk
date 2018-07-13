import User from '@models/User';
import { observable } from 'mobx';

import moment from 'moment';
import 'moment/locale/ko';
import 'moment/locale/ja';
// import 'moment/locale/zh-cn';
// import 'moment/locale/es';
// import 'moment/locale/fr';
// import 'moment/locale/id';

class ObservableListStore {
  @observable private _friends: any = [];

  public get friends(): any {
    return this._friends;
  }
  public set friends(value: any) {
    this._friends = value;
  }
}

const observableListStore = new ObservableListStore();
export default observableListStore;
