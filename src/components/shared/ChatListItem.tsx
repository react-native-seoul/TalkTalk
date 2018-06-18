import LinearGradient from 'react-native-linear-gradient';
import React, { Component } from 'react';
import moment from 'moment';
import {
  ActivityIndicator,
  StyleSheet,
  Image,
  Text,
  View,
} from 'react-native';

import { ratio, colors, screenWidth } from '@utils/Styles';
import { IC_MASK } from '@utils/Icons';

const styles: any = StyleSheet.create({
  wrapperPeer: {
    minHeight: 48 * ratio,
    width: '100%',
    marginTop: 20 * ratio,

    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  imgPeer: {
    width: 32 * ratio,
    height: 32 * ratio,
    marginLeft: 20 * ratio,
    marginRight: 8 * ratio,
  },
  txtPeerMsg: {
    fontSize: 14 * ratio,
    color: colors.dusk,
    marginRight: 8 * ratio,
    backgroundColor: 'white',
    borderRadius: 3 * ratio,
    borderWidth: 1,
    borderColor: colors.paleGray,
    padding: 12 * ratio,
    shadowColor: colors.paleGray,
    shadowOffset: {
      width: 0,
      height: 2 * ratio,
    },
  },
  txtPeerDate: {
    fontSize: 12 * ratio,
    color: colors.cloudyBlue,
    marginRight: 20 * ratio,
  },
  wrapperSelf: {
    minHeight: 48 * ratio,
    width: '100%',
    marginTop: 20 * ratio,

    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  txtMyDate: {
    fontSize: 12 * ratio,
    color: colors.cloudyBlue,
    marginLeft: 20 * ratio,
  },
  myGradient: {
    marginRight: 20 * ratio,
    marginLeft: 8 * ratio,
    borderRadius: 3 * ratio,
  },
  txtMyMsg: {
    fontSize: 14 * ratio,
    color: 'white',
    padding: 12 * ratio,
  },
});

interface ItemProps {
  item?: any;
}

class Shared extends Component<ItemProps, any> {
  private static defaultProps: Partial<ItemProps> = {
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  public render() {
    return (
      this.props.item.isPeer
        ? <View style={styles.wrapperPeer}>
          <Image style={styles.imgPeer} source={IC_MASK}/>
          <Text style={styles.txtPeerMsg}>{this.props.item.message}</Text>
          <Text style={styles.txtPeerDate}>
            {`${moment(this.props.item.date).hour()} : ${moment(this.props.item.date).minutes()}`}
          </Text>
        </View>
        : <View style={styles.wrapperSelf}>
          <Text style={styles.txtMyDate}>
            {`${moment(this.props.item.date).hour()} : ${moment(this.props.item.date).minutes()}`}
          </Text>
          <LinearGradient
            start={{x: 0.2, y: 0.4}} end={{x: 1.0, y: 0.8}}
            locations={[0, 0.85]}
            colors={['rgb(100,199,255)', colors.dodgerBlue]} style={styles.myGradient}>
            <Text style={styles.txtMyMsg}>{this.props.item.message}</Text>
          </LinearGradient>
        </View>
    );
  }
}

export default Shared;
