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
  @observable private _rootNavigator: any;
  @observable private _rootNavigatorPrevParams: object;
  @observable private _rootNavigatorParams: object;
  @observable private _rootNavigatorActionHorizontal: boolean;
  @observable private _user: User;
  @observable private _firebaseUser: any;

  constructor() {
    this._rootNavigatorActionHorizontal = true;
    this._rootNavigatorPrevParams = null;
    this._rootNavigatorParams = null;
    this._user = new User();
  }

  public get profileModal(): any {
    return this._profileModal;
  }

  public set profileModal(value: any) {
    this._profileModal = value;
  }

  public get rootNavigator(): any {
    return this._rootNavigator;
  }

  public set rootNavigator(value: any) {
    this._rootNavigator = value;
  }

  public get rootNavigatorActionHorizontal(): boolean {
    return this._rootNavigatorActionHorizontal;
  }

  public set rootNavigatorActionHorizontal(value: boolean) {
    this._rootNavigatorActionHorizontal = value;
  }

  public get rootNavigatorParams(): object {
    return this._rootNavigatorParams;
  }

  public set rootNavigatorParams(value: object) {
    this._rootNavigatorParams = value;
  }

  public get user(): User {
    return this._user;
  }

  public set user(value: User) {
    this._user = value;
  }

  public get firebaseUser(): any {
    return this._firebaseUser;
  }

  public set firebaseUser(value: any) {
    this._firebaseUser = value;
  }

  public navigateRoot = (slideHorizontal: boolean, routeName: string, params?: object) => {
    console.log('navigateRoot');
    this._rootNavigatorActionHorizontal = slideHorizontal;

    if (this._rootNavigatorParams) {
      this._rootNavigatorPrevParams = this._rootNavigatorParams;
      this._rootNavigatorParams = params;
    }

    if (this._rootNavigator) {
      console.log(`navigate: ${routeName}`);
      this._rootNavigator.navigate(routeName);
    }
  }

  public navigateRootBack = () => {
    console.log('navigateRootBack');
    this._rootNavigatorParams = this._rootNavigatorPrevParams;
    this._rootNavigatorPrevParams = null;
    this._rootNavigator.goBack(null);
  }

  public navigateRootReset = (resetAction) => {
    this._rootNavigator.dispatch(resetAction);
  }
}

const observableListStore = new ObservableListStore();
export default observableListStore;
