import firebase from 'firebase';
import React from 'react';
import { AsyncStorage, View, Platform, StyleSheet } from 'react-native';
import { createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
// import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import StackViewStyleInterpolator from 'react-navigation/src/views/StackView/StackViewStyleInterpolator';

import MainTabNavigator from './MainTabNavigator';
import Login from '@screen/Login';
import Signup from '@screen/Signup';
import FindPw from '@screen/FindPw';
import ProfileUpdate from '@screen/ProfileUpdate';
import SearchUser from '@screen/SearchUser';
import Chat from '@screen/Chat';
import NotFound from '@screen/NotFound';
import { observer } from 'mobx-react/native';
import ProfileModal from '@shared/ProfileModal';
import appStore from '@stores/appStore';

const routeConfig = {
  Main: { screen: MainTabNavigator },
  ProfileUpdate: { screen: ProfileUpdate },
  SearchUser: { screen: SearchUser },
  Chat: { screen: Chat },
  NotFound: { screen: NotFound },
};

const navigatorConfig = {
  initialRouteName: 'Main',
  headerMode: 'none',
  gesturesEnabled: true,
  statusBarStyle: 'light-content',
  transitionConfig: () => ({ screenInterpolator:
    appStore.rootNavigatorActionHorizontal
      ? StackViewStyleInterpolator.forHorizontal
      : StackViewStyleInterpolator.forVertical,
  }),
};

// FIXED: Current fix for navigating twice
const MainStackNavigator = createStackNavigator(routeConfig, navigatorConfig);
// if (Platform.OS === 'ios') {
//   const navigateOnce = (getStateForAction) => (action, state) => {
//     const { type, routeName } = action;
//     return (
//       state &&
//       type === NavigationActions.NAVIGATE &&
//       routeName === state.routes[state.routes.length - 1].routeName
//     ) ? null : getStateForAction(action, state);
//   };
//   MainStackNavigator.router.getStateForAction = navigateOnce(MainStackNavigator.router.getStateForAction);
// }

@observer
class RootNavigator extends React.Component<any, any> {
  private static router = MainStackNavigator.router;

  public render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <MainStackNavigator navigation={this.props.navigation} />
        <ProfileModal
          ref={(v) => appStore.profileModal = v}
          onChat={this.onChat}
        />
      </View>
    );
  }

  private onChat = () => {
    appStore.profileModal.close();
    appStore.navigateRoot(true, 'Chat');
  }
}

export default RootNavigator;
