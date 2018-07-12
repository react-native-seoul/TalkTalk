import firebase from 'firebase';
import { USE_FIRESTORE } from '@utils/Constants';
import UserListItem from '@shared/UserListItem';
import EmptyListItem from '@shared/EmptyListItem';
import React, { Component } from 'react';
import update from 'immutability-helper';
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
import StatusBar from '@shared/StatusBar';
import Swipeout from 'react-native-swipeout';
import ActionSheet from 'react-native-actionsheet';
import { db_unfriend } from '@db/User';

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
  private actionSheet: any = null;
  private selectedUser: any = null;

  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      openedContextMenuIndex: -1,
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
      .onSnapshot((snapshots) => {
        const friends = this.state.friends;
        if (snapshots.size === 0) {
          this.setState({ friends: [] });
          return;
        }
        snapshots.docChanges().forEach((change) => {
          let user = change.doc.data();
          console.log('user', user);
          user.friendId = change.doc.id;
          firebase.firestore().collection('users').doc(user.id).onSnapshot((friendSnap) => {
            if (change.type === 'added') {
              user = { ...user, ...friendSnap.data() };
              friends.push(user);
              if (snapshots.size === friends.length) {
                this.setState({ friends });
                return;
              }
            }

            if (change.type === 'removed') {
              const index = this.state.friends.findIndex((el) => {
                return el.friendId === user.friendId;
              });
              console.log(index);
              this.setState({
                friends: update(
                  this.state.friends, {
                    $splice: [ [ index, 1 ] ],
                  },
                ),
              });
            }

            // if (change.type === 'modified') {
            //   const index = this.state.friends.findIndex((el) => {
            //     return el.friendId === user.friendId;
            //   });
            //   this.setState({
            //     friends: update(
            //       this.state.friends, {
            //         [index]: user,
            //       },
            //     ),
            //   });
            // }
          });
        });
      });
      return;
    }
    firebase.database().ref(`users/${userData.uid}`).child('friends')
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
        <StatusBar isDarkContent={false}/>
        <FlatList
          style={{
            alignSelf: 'stretch',
          }}
          contentContainerStyle={
            this.state.friends.length === 0
              ? {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }
              : null
          }
          keyExtractor={(item, index) => index.toString()}
          data={this.state.friends}
          renderItem={this.renderItem}
          ListEmptyComponent={<EmptyListItem>{getString('NO_CONTENT')}</EmptyListItem>}
        />
        {Platform.OS === 'android' && <ActionSheet
          ref={(comp) => this.actionSheet = comp}
          options={['Unfriend', 'Cancel']}
          cancelButtonIndex={1}
          destructiveButtonIndex={0}
          onPress={this.onPressActionSheetButton}
        />}
      </View>
    );
  }

  private onPressUnfriend = (user) => {
    db_unfriend(user);
  }

  private showActionSheet = (user) => {
    console.log('showActionSheet');
    this.selectedUser = user;
    if (this.actionSheet) { this.actionSheet.show(); }
  }

  private onPressActionSheetButton = (index) => {
    if (index === 0) {
      this.onPressUnfriend(this.selectedUser);
    }
  }

  private onOpenContextMenu = (sectionID, rowID) => {
    this.setState({openedContextMenuIndex: rowID});
  }

  private renderItem = ({ item, index }) => {
    const listItem = 
      <UserListItem
        item={item}
        onPress={() => this.onItemClick(item)}
        onLongPress={Platform.select({ios: null, android: () => this.showActionSheet(item)})}
      />;

    if (Platform.OS === 'ios') {
      return (
        <Swipeout 
          rowID={index}
          close={index !== this.state.openedContextMenuIndex}
          autoClose={true}
          onOpen={this.onOpenContextMenu}
          right={[{text: 'Unfriend', backgroundColor: 'red', onPress: () => this.onPressUnfriend(item)}]}>
          {listItem}
        </Swipeout>
      );
    } else {
      return listItem;
    }
  }

  private onItemClick = async (item) => {
    appStore.profileModal.setUser(item);
    appStore.profileModal.showAddBtn(false);
    appStore.profileModal.open();
  }
}

export default Screen;
