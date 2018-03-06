import firebase from 'firebase';
import { USE_FIRESTORE } from '@utils/Constants';
import UserListItem from '@shared/UserListItem';
import EmptyListItem from '@shared/EmptyListItem';
import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  FlatList,
  Platform,
} from 'react-native';

import { ratio, colors, screenWidth } from '@utils/Styles';
import { getString } from '@STRINGS';
import appStore from '@stores/appStore';

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

class Screen extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
    };
  }

  public componentDidMount() {
    /**
     * get all friends
     */
    const userData = firebase.auth().currentUser;
    if (USE_FIRESTORE) {
      firebase.firestore().collection('users')
      .doc(`${userData.uid}`).collection('friends')
      .orderBy('id', 'asc')
      .onSnapshot((snapshots) => {
        const friends = [];
        if (snapshots.size === 0) {
          this.setState({ friends });
          return;
        }
        snapshots.forEach((doc) => {
          let user = doc.data();
          user.friendId = doc.id;
          firebase.firestore().collection('users').doc(user.id).onSnapshot((friendSnap) => {
            user = { ...user, ...friendSnap.data() };
            friends.push(user);
            if (snapshots.size === friends.length) {
              this.setState({ friends });
            }
          });
        });
      });
      return;
    }
    firebase.database().ref(`users/${userData.uid}`).child('friends')
    .orderByChild('id')
    .on('value', (snapshots) => {
      const friends = [];
      if (snapshots.numChildren() === 0) {
        this.setState({ friends });
        return;
      }
      snapshots.forEach((doc) => {
        let user = doc.val();
        user.friendId = doc.key;
        firebase.database().ref(`users/${user.id}`)
        .on('value', (friendSnap) => {
          user = { ...user, ...friendSnap.val() };
          friends.push(user);
          if (snapshots.numChildren() === friends.length) {
            this.setState({ friends });
          }
        });
      });
    });
  }

  public render() {
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={[
            {
              flex: 1,
              marginTop: 16 * ratio,
              alignItems: this.state.friends.length === 0 ? 'center' : 'flex-start',
              justifyContent: this.state.friends.length === 0 ? 'center' : 'flex-start',
            },
          ]}
          keyExtractor={(item, index) => index.toString()}
          data={this.state.friends}
          renderItem={this.renderItem}
          ListEmptyComponent={<EmptyListItem>{getString('NO_CONTENT')}</EmptyListItem>}
        />
      </View>
    );
  }

  private renderItem = ({ item }) => {
    return (
      <UserListItem
        item={item}
        onPress={() => this.onItemClick(item)}
      />
    );
  }

  private onItemClick = async (item) => {
    appStore.profileModal.setUser(item);
    appStore.profileModal.showAddBtn(false);
    appStore.profileModal.open();
  }
}

export default Screen;
