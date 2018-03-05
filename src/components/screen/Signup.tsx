import firebase from 'firebase';
require('firebase/firestore');
import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';

import { ratio, colors, statusBarHeight } from '@utils/Styles';
import HeaderBack from '@shared/HeaderBack';
import { IC_BACK } from '@utils/Icons';
import { getString } from '@STRINGS';
import appStore from '@stores/appStore';
import TextInput from '@shared/TextInput';
import Button from '@shared/Button';

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: statusBarHeight, // false to get height of android too.
    backgroundColor: 'white',

    flexDirection: 'column',
    alignItems: 'center',
  },
  scrollView: {
    alignSelf: 'stretch',
  },
  scrollViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    marginTop: 40 * ratio,
    width: '78%',

    flexDirection: 'column',
    alignItems: 'center',
  },
  btnWrapper: {
    width: '100%',
    alignItems: 'flex-end',
  },
  btnRegister: {
    backgroundColor: colors.dodgerBlue,
    borderColor: colors.dodgerBlue,
    borderRadius: 4 * ratio,
    borderWidth: 1 * ratio,
    width: 136 * ratio,
    height: 60 * ratio,
    marginLeft: 4 * ratio,
    marginTop: 24 * ratio,
    marginBottom: 48 * ratio,
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
  txtRegister: {
    fontSize: 16 * ratio,
    fontWeight: 'bold',
    color: 'white',
  },
});

interface IState {
  isRegistering: boolean;
  email: string;
  password: string;
  displayName: string;
  statusMsg: string;
}

class Screen extends Component<any, IState> {
  constructor(props) {
    super(props);
    this.state = {
      isRegistering: false,
      email: '',
      pw: '',
      displayName: '',
      statusMsg: '',
    };
  }

  public render() {
    return (
      <View style={styles.container}>
        <HeaderBack
          imgSrc={IC_BACK}
          onBackPressed={this.goBack}
        >{getString('SIGNUP')}</HeaderBack>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContainer}
        >
          <View style={styles.wrapper}>
            <TextInput
              style={{ marginTop: 8 * ratio }}
              txtLabel={getString('EMAIL')}
              txtHint={ getString('EMAIL') }
              txt={ this.state.email }
              onTextChanged={ (text) => this.onTextChanged('EMAIL', text)}
            />
            <TextInput
              style={{ marginTop: 24 * ratio }}
              txtLabel={ getString('PASSWORD') }
              txtHint={ getString('PASSWORD') }
              txt={ this.state.pw }
              onTextChanged={ (text) => this.onTextChanged('PW', text)}
              isPassword={ true }
            />
            <TextInput
              style={{ marginTop: 24 * ratio }}
              txtLabel={getString('NAME')}
              txtHint={ getString('NAME') }
              txt={ this.state.displayName }
              onTextChanged={ (text) => this.onTextChanged('NAME', text)}
            />
            <TextInput
              style={{ marginTop: 24 * ratio }}
              txtLabel={getString('STATUS_MSG')}
              txtHint={ getString('STATUS_MSG') }
              txt={ this.state.statusMsg }
              onTextChanged={ (text) => this.onTextChanged('STATUS_MSG', text)}
            />
            <View style={styles.btnWrapper}>
              <Button
                isLoading={this.state.isRegistering}
                onPress={this.onRegister}
                style={styles.btnRegister}
                textStyle={styles.txtRegister}
              >{getString('REGISTER')}</Button>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  private onRegister = () => {
    this.setState({ isRegistering: true }, async () => {
      try {
        const userData = await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pw);
        console.log(userData);
        userData.updateProfile({
          displayName: this.state.displayName,
          photoURL: '',
        });

        // realtime-database
        firebase.database().ref('users').child(`${userData.uid}`).set({
          displayName: this.state.displayName,
          email: this.state.email,
          img: '',
          statusMsg: this.state.email,
        });

        // firestore
        firebase.firestore().collection('users').doc(`${userData.uid}`).set({
          displayName: this.state.displayName,
          email: this.state.email,
          img: '',
          statusMsg: this.state.email,
        });
      } catch (err) {
        this.setState({ isRegistering: false });
        Alert.alert(getString('ERROR'), err.message);
        return false;
      }
    });

  }

  private onTextChanged = (type, text) => {
    switch (type) {
      case 'EMAIL':
        this.setState({ email: text });
        return;
      case 'PW':
        this.setState({ pw: text });
        return;
      case 'NAME':
        this.setState({ displayName: text });
        return;
      case 'STATUS_MSG':
        this.setState({ statusMsg: text });
        return;
    }
  }

  private goBack = () => {
    appStore.navigateRootBack();
  }
}

export default Screen;
