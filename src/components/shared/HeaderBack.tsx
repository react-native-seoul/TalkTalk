/*import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  ViewStyle,
  TextStyle,
  ImageStyle,
  ImageSourcePropType,
} from 'react-native';

import { screenWidth, ratio, colors } from '@utils/Styles';

const styles: any = StyleSheet.create({
  wrapper: {
    backgroundColor: 'transparent',
    alignSelf: 'stretch',
    height: 60 * ratio,

    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  txt: {
    fontSize: 20 * ratio,
    fontWeight: 'bold',
    color: colors.dusk,
  },
  img: {
    width: 60 * ratio,
    height: 60 * ratio,
  },
});

interface ItemProps {
  style?: ViewStyle;
  txtStyle?: TextStyle;
  imgStyle?: ImageStyle;
  imgSrc?: ImageSourcePropType;
  onBackPressed?: () => void;
}

class Shared extends Component<ItemProps, any> {
  private static defaultProps: Partial<ItemProps> = {
    style: styles.wrapper,
    txtStyle: styles.txt,
    imgStyle: styles.img,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  public render() {
    return (
      <View style={this.props.style}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={this.props.onBackPressed}
        >
          <Image style={this.props.imgStyle} source={this.props.imgSrc}/>
        </TouchableOpacity>
        <Text style={this.props.txtStyle}>{this.props.children}</Text>
      </View>
    );
  }
}

export default Shared;
*/
