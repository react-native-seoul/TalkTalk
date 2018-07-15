import { observer } from 'mobx-react/native';
import React from 'react';
import { Platform, Image, View, Text, AsyncStorage, BackHandler, StyleSheet, TouchableOpacity } from 'react-native';
import { ratio, colors, statusBarHeight } from '@utils/Styles';
import { getString } from '@STRINGS';
import {
  StackActions,
  TabNavigator,
  TabBarTop,
  NavigationAction,
  createMaterialTopTabNavigator,
} from 'react-navigation';
import firebase from 'firebase';

import LinearGradient from 'react-native-linear-gradient';
import { IC_MASK, IC_ADD } from '@utils/Icons';

import appStore from '@stores/appStore';

import Friend from '@screen/Friend';
import Message from '@screen/Message';
import Setting from '@screen/Setting';

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: statusBarHeight, // false to get height of android too.
  },
  imgHeaderLeft: {
    marginLeft: 20,
    width: 28,
    height: 28,
    borderRadius: 14,
    borderColor: 'white',
    borderWidth: 1,
  },
  imgHeaderRight: {
    width: 24,
    height: 24,
    right: 12,
    tintColor: 'white',
  },
  txt: {
    color: 'white',
    fontSize: 15,
  },
  txtSub: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700', 
  },
});

const Navigator = createMaterialTopTabNavigator(
  {
    Friend: { screen: Friend },
    Message: { screen: Message },
    Setting: { screen: Setting },
  },
  {
    navigationOptions: ({ navigation, screenProps }) => ({
      tabBarVisible: true,
      tabBarLabel: ({focused}) => {
        const { routeName } = navigation.state;
        switch (routeName) {
          case 'Friend':
            return <Text style={[styles.txt, {opacity: focused ? 1 : 0.8}]}>
                {getString('FRIEND')}  <Text style={styles.txtSub}>24</Text>
              </Text>;
          case 'Message':
            return <Text style={[styles.txt, {opacity: focused ? 1 : 0.8}]}>
                {getString('MESSAGE')}  <Text style={styles.txtSub}>8</Text>
              </Text>;
          case 'Setting':
            return <Text style={[styles.txt, {opacity: focused ? 1 : 0.8}]}>
                {'Setting'}
              </Text>;
        }
        return null;
      },
    }),
    animationEnabled: true,
    swipeEnabled: Platform.select({android: true, ios: false}),
    tabBarOptions: {
      indicatorStyle: {
        backgroundColor: 'white',
      },
      style: {
        height: 40,
        justifyContent: 'center',
        backgroundColor: colors.dodgerBlue,
        borderTopColor: 'transparent', borderTopWidth: 0, elevation: 0,
      },
    },
  },
);

export default Navigator;

export const MainTabNavigationOptions = ({navigation}) => {
  console.log('check route name', navigation.state.routes[navigation.state.index].routeName);
  let color;
  switch (navigation.state.index) {
    case 0: color = 'red'; break;
    case 1: color = 'green'; break;
    case 2: color = 'blue'; break;
    default: color = 'black'; break;
  }

  const title = 'Talk Talk';
  return {
    title,
    headerStyle: {backgroundColor: color},
    headerLeft: 
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => navigation.navigate('Profile', { user: firebase.auth().currentUser })}
      >
        <Image style={styles.imgHeaderLeft} source={IC_MASK}/>
      </TouchableOpacity>,
    headerRight:
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => navigation.navigate('SearchUser')}
      >
        <Image style={styles.imgHeaderRight} source={IC_ADD}/>
      </TouchableOpacity>,
  };
};
