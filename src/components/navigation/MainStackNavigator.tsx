import firebase from 'firebase';
import React from 'react';
import { AsyncStorage, View, Platform, StyleSheet } from 'react-native';
import { createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
// import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import StackViewStyleInterpolator from 'react-navigation/src/views/StackView/StackViewStyleInterpolator';

import MainTabNavigator, {MainTabNavigationOptions} from './MainTabNavigator';
import Profile from '@screen/Profile';
import SearchUser from '@screen/SearchUser';
import Chat from '@screen/Chat';
import NotFound from '@screen/NotFound';
import { commonNavigationOptions } from '@navigation/NavigationOptions';

const routeConfig = {
  Main: { screen: MainTabNavigator, navigationOptions: MainTabNavigationOptions },
  SearchUser: { screen: SearchUser },
  Chat: { screen: Chat },
  NotFound: { screen: NotFound },
};

const navigatorConfig = {
  initialRouteName: 'Main',
  gesturesEnabled: true,
  transitionConfig: () => ({ screenInterpolator: StackViewStyleInterpolator.forHorizontal }),
  navigationOptions: commonNavigationOptions,
};

const MainStackNavigator = createStackNavigator(routeConfig, navigatorConfig);

const rootRouteConfig = {
  MainRoot: { screen: MainStackNavigator },
  Profile: { screen: Profile },
};

const rootNavigatorConfig = {
  mode: 'modal', 
  navigationOptions: {
    header: null,
  },
};

const RootNavigator = createStackNavigator(rootRouteConfig, rootNavigatorConfig);

export default RootNavigator;
