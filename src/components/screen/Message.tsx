import EmptyListItem from '@shared/EmptyListItem';
import ChatroomListItem from '@shared/ChatroomListItem';
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

import { ratio, colors } from '@utils/Styles';
import { getString } from '@STRINGS';

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
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {
          id: 1,
          img: null,
          displayName: 'dooboolab',
          msg: 'When are you finishing??',
          count: 6,
          date: new Date(),
        },
        {
          id: 2,
          img: null,
          displayName: 'Byun8585',
          msg: 'Hi. This is student from react-native...',
          count: 0,
          date: new Date(),
        },
    ],
    };
  }

  public render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={{
            alignSelf: 'stretch',
          }}
          contentContainerStyle={
            this.state.messages.length === 0
              ? {
                flex: 1,
                alignSelf: 'stretch',
                alignItems: 'center',
                justifyContent: 'center',
              }
              : null
          }
          keyExtractor={(item, index) => index.toString()}
          data={this.state.messages}
          renderItem={this.renderItem}
          ListEmptyComponent={<EmptyListItem>{getString('NO_CONTENT')}</EmptyListItem>}
        />
      </View>
    );
  }

  private renderItem = ({ item }) => {
    return (
      <ChatroomListItem
        item={item}
        onPress={() => this.onItemClick(item.id)}
      />
    );
  }

  private onItemClick = (itemId) => {
    console.log(`onItemClick: ${itemId}`);
    this.props.navigation.navigate('Chat', {chatId: itemId});
  }
}

export default Screen;
