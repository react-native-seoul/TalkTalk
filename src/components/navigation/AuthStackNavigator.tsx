import firebase from 'firebase';
import React from 'react';
import { AsyncStorage, View, Platform, StyleSheet } from 'react-native';
import { createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
// import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import StackViewStyleInterpolator from 'react-navigation/src/views/StackView/StackViewStyleInterpolator';

import NavigationService from '@navigation/NavigationService';
import MainTabNavigator from './MainTabNavigator';
import Login from '@screen/Login';
import Signup from '@screen/Signup';
import FindPw from '@screen/FindPw';
import NotFound from '@screen/NotFound';

const StackNavigator = createStackNavigator(
  {
    Login: { screen: Login },
    Signup: { screen: Signup },
    FindPw: { screen: FindPw },
    NotFound: { screen: NotFound },
  },
  {
    initialRouteName: 'Login',
  },
);

class AuthStackNavigator extends React.Component<any, any> {
  private static router = StackNavigator.router;

  public render() {
    return (
      <StackNavigator
        ref={(v) => {
          if (v) {
            NavigationService.setTopLevelNavigator(v);
          }
        }}
        navigation={this.props.navigation}
      />
    );
  }
}

export default AuthStackNavigator;
