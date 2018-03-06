import firebase from 'firebase';
import { USE_FIRESTORE } from '@utils/Constants';

import UserListItem from '@shared/UserListItem';
import EmptyListItem from '@shared/EmptyListItem';
import ProfileModal from '@shared/ProfileModal';
import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  View,
  FlatList,
  Platform,
} from 'react-native';

import { ratio, colors, statusBarHeight } from '@utils/Styles';
import { IC_BACK, IC_SEARCH } from '@utils/Icons';
import { getString } from '@STRINGS';
import HeaderBack from '@shared/HeaderBack';
import appStore from '@stores/appStore';

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: statusBarHeight, // false to get height of android too.
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
  },
  viewSearch: {
    marginVertical: 20 * ratio,
    width: '100%',
    justifyContent: 'center',
  },
  imgSearch: {
    width: 16 * ratio,
    height: 16 * ratio,
    position: 'absolute',
    left: 36 * ratio,
  },
  inputSearch: {
    backgroundColor: 'rgb(247,248,251)',
    alignSelf: 'stretch',
    marginHorizontal: 20 * ratio,
    height: 40 * ratio,
    paddingLeft: 44 * ratio,
    paddingRight: 16 * ratio,
    borderRadius: 4 * ratio,
  },
});

class Screen extends Component<any, any> {
  private profileModal: any;

  constructor(props) {
    super(props);
    this.state = {
      searchTxt: '',
      users: [],
    };
  }

  public componentDidMount() {
    /**
     * get all the users
     */
    if (USE_FIRESTORE) {
      firebase.firestore().collection('users')
      .orderBy('displayName', 'asc')
      .get().then((snapshots) => {
        const users = [];
        snapshots.forEach((doc) => {
          const user = doc.data();
          user.id = doc.id;
          if (user.email !== firebase.auth().currentUser.email) {
            users.push(user);
          }
        });
        this.setState({ users });
      });
      return;
    }
    firebase.database().ref('users')
    .orderByChild('displayName')
    .once('value')
    .then((snapshots) => {
      const users = [];
      snapshots.forEach((doc) => {
        const user = doc.val();
        if (user.email !== firebase.auth().currentUser.email) {
          users.push(user);
        }
      });
      this.setState({ users });
    });
  }

  public render() {
    return (
      <View style={styles.container}>
        <HeaderBack
          imgSrc={IC_BACK}
          onBackPressed={this.goBack}
        />
        <View style={styles.viewSearch}>
          <TextInput
            onChangeText={(text) => this.onTxtChanged(text)}
            underlineColorAndroid='transparent' // android fix
            autoCapitalize='none'
            autoCorrect={false}
            multiline={false}
            value={this.state.searchTxt}
            style={styles.inputSearch}
            onSubmitEditing={this.onSearch}
          />
          <Image source={IC_SEARCH} style={styles.imgSearch}/>
        </View>
        <FlatList
          contentContainerStyle={[
            {
              flex: 1,
              alignItems: this.state.users.length === 0 ? 'center' : 'flex-start',
              justifyContent: this.state.users.length === 0 ? 'center' : 'flex-start',
            },
          ]}
          keyExtractor={(item, index) => index.toString()}
          data={this.state.users}
          renderItem={this.renderItem}
          ListEmptyComponent={<EmptyListItem>{getString('NO_CONTENT')}</EmptyListItem>}
        />
      </View>
    );
  }

  private goBack = () => {
    this.props.navigation.goBack();
  }

  private renderItem = ({ item }) => {
    return (
      <UserListItem
        item={item}
        onPress={() => this.onItemClick(item)}
      />
    );
  }

  private onItemClick = (item) => {
    console.log(item);
    appStore.profileModal.setUser(item);
    appStore.profileModal.showAddBtn(true);
    appStore.profileModal.open();
  }

  private onTxtChanged = (txt) => {
    this.setState({
      searchTxt: txt,
    });
  }

  private onSearch = () => {
    console.log('onSearch: ' + this.state.searchTxt);
    if (USE_FIRESTORE) {
      firebase.firestore().collection('users')
      .where('displayName', '>=', this.state.searchTxt)
      .where('displayName', '<', `${this.state.searchTxt}\uf8ff`)
      .get().then((snapshots) => {
        const users = [];
        snapshots.forEach((doc) => {
          const user = doc.data();
          user.id = doc.id;
          console.log(user);
          if (user.email !== firebase.auth().currentUser.email) {
            users.push(user);
          }
        });
        this.setState({ users });
      });
      return;
    }
    firebase.database().ref('users')
    .orderByChild('displayName')
    .startAt(this.state.searchTxt)
    .endAt(`${this.state.searchTxt}\uf8ff`)
    .once('value')
    .then((snapshots) => {
      const users = [];
      snapshots.forEach((doc) => {
        const user = doc.val();
        user.id = doc.id;
        if (user.email !== firebase.auth().currentUser.email) {
          users.push(user);
        }
      });
      this.setState({ users });
    });
  }

  private onChat = () => {
    this.props.navigation.navigate('Chat');
  }
}

export default Screen;
