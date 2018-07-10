import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  Text,
  View,
  FlatList,
  TextInput,
  Platform,
  Keyboard,
} from 'react-native';
import { IC_BACK, IC_SMILE } from '@utils/Icons';

import HeaderBack from '@shared/HeaderBack';
import { ratio, colors, statusBarHeight } from '@utils/Styles';
import { getString } from '@STRINGS';

import Button from '@shared/Button';
import ChatListItem from '@shared/ChatListItem';
import EmptyListItem from '@shared/EmptyListItem';

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: statusBarHeight, // false to get height of android too.

    flexDirection: 'column',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',

    flexDirection: 'column',
    alignItems: 'center',
  },
  viewChat: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: colors.paleGray,
    height: 52 * ratio,

    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  inputChat: {
    width: '80%',
    fontSize: 14 * ratio,
    marginRight: 20 * ratio,
    paddingLeft: 48 * ratio,
  },
  touchMenu: {
    position: 'absolute',
    left: 10,
    height: '100%',
    minWidth: 20 * ratio,
    justifyContent: 'center',
  },
  imgMenu: {
    width: 20 * ratio,
    height: 20 * ratio,
  },
  btnSend: {
    right: 8 * ratio,
    backgroundColor: colors.dodgerBlue,
    borderRadius: 4 * ratio,
    width: 60 * ratio,
    height: 36 * ratio,

    alignItems: 'center',
    justifyContent: 'center',
  },
  txtSend: {
    fontSize: 14 * ratio,
    fontWeight: 'bold',
    color: 'white',
    paddingHorizontal: 5 * ratio,
    paddingVertical: 10 * ratio,
  },
  viewMenu: {
    height: 258,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'green',
  },
});

class Screen extends Component<any, any> {
  private keyboardDidShowListener: any;
  private keyboardDidHideListener: any;

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      showMenu: false,
      chats: [
        {
          id: '0',
          sender: '0',
          img: null,
          message: 'hello',
          date: new Date(),
          isPeer: true,
        },
        {
          id: '1',
          sender: '1',
          img: null,
          message: 'hello',
          date: new Date(),
          isPeer: false,
        },
      ],
    };
  }

  public componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
  }

  public componentWillUnmount() {
    this.keyboardDidShowListener.remove();
  }

  public render() {
    return (
      <View style={styles.container}>
        <HeaderBack
          imgSrc={IC_BACK}
          onBackPressed={this.goBack}
        >{getString('HELLO')}</HeaderBack>
        <KeyboardAvoidingView
          behavior='padding'
          style={ styles.content }
        >
          <FlatList
            style={{
              alignSelf: 'stretch',
            }}
            contentContainerStyle={
              this.state.chats.length === 0
                ? {
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }
                : null
            }
            keyExtractor={(item, index) => index.toString()}
            data={this.state.chats}
            renderItem={this.renderItem}
            ListEmptyComponent={<EmptyListItem>{getString('NO_CONTENT')}</EmptyListItem>}
          />
          <View
            style={styles.viewChat}
          >
            <TextInput
              style={styles.inputChat}
              placeholder={ getString('WRITE_MESSAGE') }
              placeholderTextColor={ colors.cloudyBlue }
            />
            <TouchableOpacity
              style={styles.touchMenu}
              onPress={this.showMenu}
            >
              <Image style={styles.imgMenu} source={IC_SMILE}/>
            </TouchableOpacity>
            <Button
              isLoading={this.state.isLoading}
              onPress={this.sendChat}
              style={styles.btnSend}
              textStyle={styles.txtSend}
            >{getString('SEND')}</Button>
          </View>
        </KeyboardAvoidingView>
        {
          this.state.showMenu
            ? <View style={styles.viewMenu}/>
            : null
        }
      </View>
    );
  }

  private _keyboardDidShow(e) {
    console.log('keyboardHeight', e.endCoordinates.height);
}

  private renderItem = ({ item }) => {
    return (
      <ChatListItem
        item={item}
      />
    );
  }

  private sendChat = () => {
    console.log('sendChat');
  }

  private showMenu = () => {
    console.log('showMenu');
    Keyboard.dismiss();
    this.setState({
      showMenu: !this.state.showMenu,
    });
  }

  private goBack = () => {
    this.props.navigation.goBack();
  }
}

export default Screen;
