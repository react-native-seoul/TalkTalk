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
  private _profileModal: any;
  @observable private _rootNavigatorActionHorizontal: boolean;

  constructor() {
    this._rootNavigatorActionHorizontal = true;
  }

  public get profileModal(): any {
    return this._profileModal;
  }

  public set profileModal(value: any) {
    this._profileModal = value;
  }

  public get rootNavigatorActionHorizontal(): boolean {
    return this._rootNavigatorActionHorizontal;
  }

  public set rootNavigatorActionHorizontal(value: boolean) {
    this._rootNavigatorActionHorizontal = value;
  }
}

const observableListStore = new ObservableListStore();
export default observableListStore;
