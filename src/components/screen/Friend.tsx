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
import { observer } from 'mobx-react';

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

@observer
class Screen extends Component<any, any> {
  private actionSheet: any = null;
  private selectedUser: any = null;

  constructor(props) {
    super(props);
    this.state = {
      openedContextMenuIndex: -1,
    };
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
            appStore.friends.length === 0
              ? {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }
              : null
          }
          keyExtractor={(item, index) => index.toString()}
          data={appStore.friends}
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
    db_unfriend(user.uid);
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

  private onItemClick = (item) => {
    this.props.navigation.navigate('Profile', { user: item });
  }
}

export default Screen;
