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

import LinearGradient from 'react-native-linear-gradient';
import { IC_MASK, IC_ADD } from '@utils/Icons';

import appStore from '@stores/appStore';

import Friend from '@screen/Friend';
import Message from '@screen/Message';

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
    width: 60,
    height: 60,
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
        }
        return null;
      },
    }),
    animationEnabled: true,
    swipeEnabled: true,
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

export const MainTabNavigationOptions = ({navigation}) => ({
  title: 'Talk Talk',
  headerLeft: 
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => navigation.navigate('ProfileUpdate')}
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
});
