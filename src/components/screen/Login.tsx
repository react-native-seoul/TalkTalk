import firebase from 'firebase';
import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';

import { ratio, colors } from '@utils/Styles';
import { IC_ICON } from '@utils/Icons';
import { getString } from '@STRINGS';

import { statusBarHeight } from '@utils/Styles';
import appStore from '@stores/appStore';

import TextInput from '@shared/TextInput';
import Button from '@shared/Button';
import StatusBar from '@shared/StatusBar';

const styles: any = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    paddingTop: statusBarHeight, // false to get height of android too.

    flexDirection: 'column',
    alignItems: 'center',
  },
  iconWrapper: {
    position: 'absolute',
    top: 76 * ratio,
    left: 40 * ratio,

    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  icon: {
    width: 60 * ratio,
    height: 48 * ratio,
  },
  iconTxt: {
    color: colors.dusk,
    fontSize: 20 * ratio,
    fontWeight: 'bold',
    marginTop: 16 * ratio,
  },
  wrapper: {
    marginTop: 260 * ratio,
    width: '78%',
    height: 300 * ratio,

    flexDirection: 'column',
    alignItems: 'center',
  },
  viewBtnWrapper: {
    alignSelf: 'stretch',
    marginTop: 20 * ratio,

    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  btnSignup: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    borderRadius: 4 * ratio,
    borderWidth: 1 * ratio,
    width: 136 * ratio,
    height: 60 * ratio,
    borderColor: colors.dodgerBlue,
    marginRight: 4 * ratio,

    alignItems: 'center',
    justifyContent: 'center',
  },
  txtSignUp: {
    fontSize: 16 * ratio,
    fontWeight: 'bold',
    color: colors.dodgerBlue,
  },
  btnLogin: {
    backgroundColor: colors.dodgerBlue,
    borderColor: colors.dodgerBlue,
    alignSelf: 'center',
    borderRadius: 4 * ratio,
    borderWidth: 1 * ratio,
    width: 136 * ratio,
    height: 60 * ratio,
    marginLeft: 4 * ratio,
    shadowColor: colors.dodgerBlue,
    shadowOffset: {
      width: 0,
      height: 10 * ratio,
    },
    shadowRadius: 4 * ratio,
    shadowOpacity: 0.3,

    alignItems: 'center',
    justifyContent: 'center',
  },
  txtLogin: {
    fontSize: 16 * ratio,
    fontWeight: 'bold',
    color: 'white',
  },
  touchForgotPw: {
    marginTop: 20 * ratio,
  },
  txtForgotPw: {
    fontSize: 12 * ratio,
    color: colors.dodgerBlue,
    textDecorationLine: 'underline',
  },
  txtCopyright: {
    marginTop: 80 * ratio,
    fontSize: 12 * ratio,
    color: colors.cloudyBlue,
  },
});

class Screen extends Component<any, any> {
  private static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoggingIn: false,
      email: '',
      pw: '',
    };
  }

  public render() {
    return (
      <ScrollView style={styles.scrollView}>
        <StatusBar isDarkContent={true}/>
        <View style={styles.container}>
          <View style={styles.iconWrapper}>
            <Image style={styles.icon} source={IC_ICON}/>
            <Text style={styles.iconTxt}>{getString('HELLO')}.</Text>
          </View>
          <View style={styles.wrapper}>
            <TextInput
              style={ styles.txtInput }
              // txtLabel={ getString('EMAIL') }
              txtHint={ getString('EMAIL') }
              txt={ this.state.email }
              onTextChanged={ (text) => this.onTextChanged('EMAIL', text)}
            />
            <TextInput
              style={{ marginTop: 8 * ratio }}
              // txtLabel={ getString('EMAIL') }
              txtHint={ getString('PASSWORD') }
              txt={ this.state.pw }
              onTextChanged={ (text) => this.onTextChanged('PW', text)}
              isPassword={ true }
            />
            <View style={styles.viewBtnWrapper}>
              <Button
                onPress={this.goToSignup}
                style={styles.btnSignup}
                textStyle={styles.txtSignUp}
              >{getString('SIGNUP')}</Button>
              <Button
                isLoading={this.state.isLoggingIn}
                onPress={this.onLogin}
                style={styles.btnLogin}
                textStyle={styles.txtLogin}
              >{getString('LOGIN')}</Button>
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={this.goToForgotPw}
              style={styles.touchForgotPw}
            >
              <Text style={styles.txtForgotPw}>{getString('FORGOT_PW')}</Text>
            </TouchableOpacity>
            <Text style={styles.txtCopyright}>copyright by dooboolab.com</Text>
          </View>
        </View>
      </ScrollView>
    );
  }

  private onTextChanged = (type, text) => {
    switch (type) {
      case 'EMAIL':
        this.setState({ email: text });
        return;
      case 'PW':
        this.setState({ pw: text });
        return;
    }
  }

  private goToSignup = () => {
    console.log('goToSignup');
    this.props.navigation.navigate('Signup');
    // this.props.navigation.navigate('Signup');
  }
  private goToForgotPw = () => {
    this.props.navigation.navigate('FindPw');
    console.log('goToForgotPw');
  }

  private onLogin = () => {
    this.setState({ isLoggingIn: true }, async () => {
      try {
        const userData = await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pw);
        console.log(userData);
      } catch (err) {
        Alert.alert(getString('ERROR'), err.message);
        this.setState({ isLoggingIn: false });
      }
    });
  }
}

export default Screen;
