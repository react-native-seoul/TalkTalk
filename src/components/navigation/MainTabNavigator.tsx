import { observer } from 'mobx-react/native';
import React from 'react';
import { Platform, Image, View, Text, AsyncStorage, BackHandler, StyleSheet, TouchableOpacity } from 'react-native';
import { ratio, colors } from '@utils/Styles';
import { getString } from '@STRINGS';
import { TabNavigator, TabBarTop, NavigationActions } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import { IC_MASK, IC_ADD } from '@utils/Icons';

import appStore from '@stores/appStore';

import Friend from '@screen/Friend';
import Message from '@screen/Message';

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  touchHeaderRight: {
    position: 'absolute',
    right: 0,
  },
  imgHeaderRight: {
    width: 60 * ratio,
    height: 60 * ratio,
  },
});

@observer
class MainTabNavigator extends React.Component<any, any> {
  public backButtonListener: any;

  public async componentDidMount() {
    if (Platform.OS === 'android') {
      this.backButtonListener = BackHandler.addEventListener('hardwareBackPress', () => {
        if (playerStore.showFullScreen || appStore.$routers.length !== 0) {
          appStore.navigateRootBack();
          return true;
        }
        return false;
      });
    }

    appStore.rootNavigator = this.props.navigation;
  }

  public componentWillUnmount() {
    if (Platform.OS === 'android') {
      this.backButtonListener.remove();
    }
  }

  public render() {
    const Navigator = TabNavigator(
      {
        Friend: { screen: Friend },
        Message: { screen: Message },
      },
      {
        navigationOptions: ({ navigation, screenProps }) => ({
          header: null,
          headerMode: 'none',
          tabBarVisible: true,
          tabBarLabel: () => {
            const { routeName } = navigation.state;
            switch (routeName) {
              case 'Friend':
                return `${getString('FRIEND')} 24`;
              case 'Message':
                return `${getString('MESSAGE')} 8`;
            }
          },
        }),
        tabBarComponent: TabBarTop,
        tabBarPosition: 'top',
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
          statusBarStyle: 'light-content',
        },
      },
    );
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
        <Navigator/>
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

export default MainTabNavigator;
