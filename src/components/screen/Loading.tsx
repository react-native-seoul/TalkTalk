import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
  Text,
  View,
} from 'react-native';

import { ratio, colors } from '@utils/Styles';
import firebase from 'firebase';
import { IC_MASK } from '@utils/Icons';
import { animateRotateLoop } from '@utils/Functions';
import { getString } from '@STRINGS';

import * as Animatable from 'react-native-animatable';

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class Screen extends Component<any, any> {
  private spinValue: any = new Animated.Value(0);
  private spin: any = this.spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '1260deg'],
  });

  constructor(props) {
    super(props);

    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.props.navigation.navigate('AuthStackNavigator');
        return;
      }
      this.props.navigation.navigate('MainStackNavigator');
    });
  }

  public componentDidMount() {
    animateRotateLoop(this.spinValue, 3000);
  }

  public render() {
    return (
      <View style={styles.container}>
        <Animated.Image
          source={IC_MASK}
          style={{
            width: 60 * ratio,
            height: 60 * ratio,
            marginBottom: 16 * ratio,
            transform: [{ rotate: this.spin }],
          }}
        />
        <Animatable.Text
          animation='fadeIn'
          iterationCount={'infinite'}
          direction='alternate'
          style={{
            color: colors.dodgerBlue,
            fontSize: 16 * ratio,
          }}
        >
          { getString('LOADING') }
        </Animatable.Text>
      </View>
    );
  }
}

export default Screen;
