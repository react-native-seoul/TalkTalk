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
  indicatorStyle: {
    backgroundColor: colors.dodgerBlue,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 60 * ratio,
  },
  imgHeaderLeft: {
    marginLeft: 20 * ratio,
    width: 32 * ratio,
    height: 32 * ratio,
    borderRadius: 16 * ratio,
  },
  txtHeader: {
    fontSize: 14 * ratio,
    color: 'white',
    marginLeft: 20 * ratio,
  },
  // touchHeaderRight: {
  //   position: 'absolute',
  //   right: 0,
  // },
  imgHeaderRight: {
    width: 60 * ratio,
    height: 60 * ratio,
    tintColor: 'black',
  },
  txt: {
    color: colors.dusk,
    fontSize: 12 * ratio,
  },
  txtSub: {
    color: colors.dodgerBlue,
    fontSize: 12 * ratio,
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
      tabBarLabel: () => {
        const { routeName } = navigation.state;
        switch (routeName) {
          case 'Friend':
            return <Text style={styles.txt}>{getString('FRIEND')}  <Text style={styles.txtSub}>24</Text></Text>;
          case 'Message':
            return <Text style={styles.txt}>{getString('MESSAGE')}  <Text style={styles.txtSub}>8</Text></Text>;
        }
        return null;
      },
    }),
    animationEnabled: false,
    swipeEnabled: true,
    tabBarOptions: {
      activeTintColor: 'rgb(12,157,197)',
      inactiveTintColor: 'black',
      indicatorStyle: {
        backgroundColor: 'rgb(102,134,205)',
      },
      labelStyle: {
        fontSize: 12 * ratio,
      },
      tabStyle: {
        height: 48 * ratio,
      },
      style: {
        backgroundColor: 'white',
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
/*
@observer
class MainTabNavigator extends React.Component<any, any> {
  private static router = Navigator.router;
  public backButtonListener: any;

  public async componentDidMount() {
    appStore.rootNavigator = this.props.navigation;
  }

  public componentWillUnmount() {
    if (Platform.OS === 'android') {
      this.backButtonListener.remove();
    }
  }

  public render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          start={{x: 0.4, y: 0.6}} end={{x: 1.0, y: 0.8}}
          locations={[0, 0.85]}
          colors={[colors.dodgerBlue, 'rgb(100,199,255)']} style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={this.goToUpdateProfile}
          >
            <Image style={styles.imgHeaderLeft} source={IC_MASK}/>
          </TouchableOpacity>
          <Text style={styles.txtHeader}>Jang hyo</Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={this.goToSearchUser}
            style={styles.touchHeaderRight}
          >
            <Image style={styles.imgHeaderRight} source={IC_ADD}/>
          </TouchableOpacity>
        </LinearGradient>
        <Navigator navigation={this.props.navigation}/>
      </View>
    );
  }

  private goToUpdateProfile = () => {
    this.props.navigation.navigate('ProfileUpdate');
  }

  private goToSearchUser = () => {
    console.log('goToUpdateProfile');
    this.props.navigation.navigate('SearchUser');
  }
}
*/
// export default MainTabNavigator;
