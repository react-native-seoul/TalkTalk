import firebase from 'firebase';
import { USE_FIRESTORE } from '@utils/Constants';
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
import { IC_BACK, IC_MASK } from '@utils/Icons';
import { getString } from '@STRINGS';
import appStore from '@stores/appStore';
import TextInput from '@shared/TextInput';
import Button from '@shared/Button';

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
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24 * ratio,
    marginBottom: 48 * ratio,
  },
  btnLogout: {
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
  txtLogout: {
    fontSize: 16 * ratio,
    fontWeight: 'bold',
    color: colors.dodgerBlue,
  },
  btnUpdate: {
    backgroundColor: colors.dodgerBlue,
    borderColor: colors.dodgerBlue,
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
  txtUpdate: {
    fontSize: 16 * ratio,
    fontWeight: 'bold',
    color: 'white',
  },
  img: {
    width: 60 * ratio,
    height: 60 * ratio,
  },
});

class Screen extends Component<any, any> {
  private static navigationOptions = {
    title: getString('MY_PROFILE'),
  };

  constructor(props) {
    super(props);
    this.state = {
      isUpdating: false,
      displayName: '',
      statusMsg: '',
      photoURL: '',
    };
  }

  public componentDidMount() {
    console.log('componentDidMount', 'ProfileUpdate', firebase.auth().currentUser);
    const userId = firebase.auth().currentUser.uid;
    if (USE_FIRESTORE) {
      firebase.firestore().collection('users').doc(userId).get().then((doc) => {
        if (doc.exists) {
          const user = doc.data();
          console.log('user');
          console.log(user);
          this.setState({
            displayName: user.displayName,
            email: user.email,
            statusMsg: user.statusMsg,
            photoURL: user.photoURL,
          });
        }
      });
      return;
    }
    firebase.database().ref('users').child(`/${userId}`).once('value').then((snapshot) => {
      const user = snapshot.val();
      this.setState({
        displayName: user.displayName,
        email: user.email,
        statusMsg: user.statusMsg,
        photoURL: user.photoURL,
      });
    });
  }

  public render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContainer}
        >
          <View style={styles.wrapper}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={this.onPressImg}
            >
              <Image source={IC_MASK} style={styles.img} />
            </TouchableOpacity>
            <TextInput
              style={{ marginTop: 24 * ratio }}
              txtLabel={getString('NAME')}
              txtHint={ getString('NAME') }
              txt={ this.state.displayName }
              onTextChanged={ (text) => this.onTextChanged('DISPLAY_NAME', text)}
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
                onPress={this.onLogout}
                style={styles.btnLogout}
                textStyle={styles.txtLogout}
              >{getString('LOGOUT')}</Button>
              <Button
                isLoading={this.state.isUpdating}
                onPress={this.onUpdate}
                style={styles.btnUpdate}
                textStyle={styles.txtUpdate}
              >{getString('UPDATE')}</Button>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  private onLogout = async () => {
    console.log('onLogout');
    await firebase.auth().signOut();
  }

  private onUpdate = () => {
    console.log('onUpdate');
    this.setState({ isUpdating: true }, () => {
      try {
        const userData = firebase.auth().currentUser;
        userData.updateProfile({
          displayName: this.state.displayName,
          photoURL: '',
        });

        // realtime-database
        firebase.database().ref('users').child(`${userData.uid}`).set({
          displayName: this.state.displayName,
          email: this.state.email,
          photoURL: '',
          statusMsg: this.state.statusMsg,
        });

        // firestore
        firebase.firestore().collection('users').doc(`${userData.uid}`).set({
          displayName: this.state.displayName,
          statusMsg: this.state.statusMsg,
        }, { merge: true });

        this.props.navigation.goBack();
      } catch (err) {
        this.setState({ isUpdating: false });
      }
    });
  }

  private onTextChanged = (type, text) => {
    switch (type) {
      case 'DISPLAY_NAME':
        this.setState({ displayName: text });
        return;
      case 'STATUS_MSG':
        this.setState({ statusMsg: text });
        return;
    }
  }

  private onPressImg = () => {
    console.log('onPressImg');
  }
}

export default Screen;
