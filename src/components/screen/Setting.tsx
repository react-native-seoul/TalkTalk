import React, { Component } from 'react';
import {
  View,
  StyleSheet, 
} from 'react-native';

import firebase from 'firebase';
import { getString } from '@STRINGS';
import Button from '@shared/Button';
import { colors } from '@utils/Styles';

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
  },
  btnUpdate: {
    backgroundColor: colors.dodgerBlue,
    borderColor: colors.dodgerBlue,
    borderRadius: 4,
    borderWidth: 1,
    width: 136,
    height: 60,
    shadowColor: colors.dodgerBlue,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 4,
    shadowOpacity: 0.3,

    alignItems: 'center',
    justifyContent: 'center',
    left: 20, top: 20, 
  },
  txtUpdate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

class Screen extends Component<any, any> {
  private static navigationOptions = {
    title: 'Setting',
  };


  public render() {
    return (
      <View>
        <Button
          onPress={this.onLogout}
          style={styles.btnUpdate}
          textStyle={styles.txtUpdate}
        >LOGOUT</Button>
      </View>
    );
  }

  private onLogout = () => {
    firebase.auth().signOut();
  }
}

export default Screen;
