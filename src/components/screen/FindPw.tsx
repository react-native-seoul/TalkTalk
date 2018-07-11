import firebase from 'firebase';
import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  ScrollView,
  Platform,
} from 'react-native';

import { ratio, colors, statusBarHeight } from '@utils/Styles';
import { IC_BACK } from '@utils/Icons';
import { getString } from '@STRINGS';
import appStore from '@stores/appStore';
import TextInput from '@shared/TextInput';
import Button from '@shared/Button';
import StatusBar from '@shared/StatusBar';

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
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

class Screen extends Component<any, any> {
  private static navigationOptions = {
    title: getString('FIND_PW'),
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: '',
    };
  }

  public render() {
    return (
      <View style={styles.container}>
        <StatusBar isDarkContent={false}/>
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
              isPassword={ true }
            />
            <View style={styles.btnWrapper}>
              <Button
                isLoading={this.state.isLoading}
                onPress={this.onSendLink}
                style={styles.btnRegister}
                textStyle={styles.txtRegister}
              >{getString('SEND_LINK')}</Button>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  private onTextChanged = (type, text) => {
    switch (type) {
      case 'EMAIL':
        this.setState({ email: text });
        return;
    }
  }

  private goBack = () => {
    this.props.navigation.goBack();
  }

  private onSendLink = () => {
    console.log('onSendLink');
    this.setState({
      isLoading: true,
    }, async () => {
      await firebase.auth().sendPasswordResetEmail(this.state.email);
      this.setState({ isLoading: false });
    });
  }
}

export default Screen;
