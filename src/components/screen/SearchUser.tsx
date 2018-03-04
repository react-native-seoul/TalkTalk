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
      users: [
        {
          id: 1,
          img: null,
          displayName: '고현정잉',
          statusMsg: '나는 지금 아무 생각이',
        },
        {
          id: 2,
          img: null,
          displayName: '고무고무열매',
          statusMsg: '',
        },
      ],
    };
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
            style={styles.inputSearch}
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
        <ProfileModal
          ref={(v) => this.profileModal = v}
          onChat={this.onChat}
          onAddFriend={this.addFriend}
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
        onPress={() => this.onItemClick(item.id)}
      />
    );
  }

  private onItemClick = (itemId) => {
    console.log(`onItemClick: ${itemId}`);
    appStore.profileModal.setUser(this.state.users[0]);
    appStore.profileModal.open();
  }

  private onChat = () => {
    this.props.navigation.navigate('Chat');
  }

  private addFriend = () => {
    console.log('addFriend');
  }
}

export default Screen;
