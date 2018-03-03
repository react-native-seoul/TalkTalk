import LinearGradient from 'react-native-linear-gradient';
import React, { Component } from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  View,
} from 'react-native';

import { IC_MASK } from '@utils/Icons';
import { ratio, colors } from '@utils/Styles';
import Modal from 'react-native-modalbox';
import { getString } from '@STRINGS';

import appStore from '@stores/appStore';

const styles: any = StyleSheet.create({
  modal: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    height: 320 * ratio,
    marginTop: 160 * ratio,

    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    height: 320 * ratio,
    marginHorizontal: 20 * ratio,
    alignSelf: 'stretch',

    alignItems: 'center',
    justifyContent: 'space-between',
  },
  view: {
    marginTop: 40 * ratio,
  },
  viewBtns: {
    height: 80 * ratio,
    alignSelf: 'stretch',
    backgroundColor: 'white',

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewBtnDivider: {
    width: 1,
    height: 80 * ratio,
    backgroundColor: colors.paleGray,
  },
  viewBtn: {
    width: '50%',
    height: 80 * ratio,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    alignSelf: 'center',
  },
  txtDisplayName: {
    fontSize: 24 * ratio,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 32 * ratio,
    alignSelf: 'center',
  },
  txtStatusMsg: {
    fontSize: 12 * ratio,
    color: 'white',
    marginTop: 8 * ratio,
    alignSelf: 'center',
  },
  txtBtn: {
    color: colors.dodgerBlue,
    fontSize: 16 * ratio,
  },
});

interface ItemState {
  user: {
    id: string;
    img: Image.propTypes.source;
    displayName: string;
    statusMsg: string;
  };
}

interface ItemProps {
  style?: View.propTypes.style;
  onAddChat?: () => void;
  onAddFriend?: () => void;
}

class Shared extends Component<ItemProps, ItemState> {
  private static defaultProps: Partial<ItemProps> = {
    style: styles.wrapper,
  };

  private modal: any;

  constructor(props) {
    super(props);
    this.state = {
      user: {
        id: '',
        img: null,
        displayName: '',
        statusMsg: '',
      },
    };
  }

  public setUser = (user) => {
    return new Promise((resolve, reject) => {
      try {
        this.setState({
          user,
        }, () => {
          resolve();
        });
      } catch (err) {
        reject(false);
      }
    });
  }

  public open = () => {
    this.modal.open();
  }

  public close = () => {
    this.modal.close();
  }

  public render() {
    return (
      <Modal
        ref={(v) => this.modal = v}
        backdropOpacity={0.075}
        entry={'top'}
        position={'top'}
        style={styles.modal}
      >
        <LinearGradient
          style={this.props.style}
          start={{x: 0.4, y: 0.6}} end={{x: 1.0, y: 0.8}}
          locations={[0, 0.85]}
          colors={[colors.dodgerBlue, 'rgb(100,199,255)']}>
          <View style={styles.view}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={this.goToUpdateProfile}
            >
              <Image style={styles.img} source={this.state.user.img ? this.state.user.img : IC_MASK}/>
            </TouchableOpacity>
            <Text style={styles.txtDisplayName}>{this.state.user.displayName}</Text>
            <Text style={styles.txtStatusMsg}>{this.state.user.statusMsg}</Text>
          </View>
          <View style={styles.viewBtns}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={this.props.onAddFriend}
              style={styles.viewBtn}
            >
              <View style={styles.viewBtn}>
                <Text style={styles.txtBtn}>{getString('ADD_FRIEND')}</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.viewBtnDivider}/>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={this.props.onAddChat}
              style={styles.viewBtn}
            >
              <View style={styles.viewBtn}>
                <Text style={styles.txtBtn}>{getString('GO_CHAT')}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Modal>
    );
  }
}

export default Shared;
