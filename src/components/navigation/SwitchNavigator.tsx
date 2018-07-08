
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import Loading from '../screen/Loading';
import AuthStackNavigator from './AuthStackNavigator';
import MainStackNavigator from './MainStackNavigator';

export default createSwitchNavigator(
  {
    Loading,
    AuthStackNavigator,
    MainStackNavigator,
  },
  {
    initialRouteName: 'Loading',
  },
);
