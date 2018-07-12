import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native';

import { IC_MASK } from '@utils/Icons';
import { ratio, colors, screenWidth } from '@utils/Styles';

const styles: any = StyleSheet.create({
  container: {
    width: '100%',
  },
  wrapper: {
    backgroundColor: 'white',
    height: 80 * ratio,
    borderBottomWidth: 1,
    borderColor: 'rgb(247,248,251)',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  img: {
    marginHorizontal: 20 * ratio,
    width: 40 * ratio,
    height: 40 * ratio,
  },
  txt: {
    width: 100 * ratio,
    fontSize: 14 * ratio,
    color: colors.dusk,
  },
  txtRight: {
    position: 'absolute',
    right: 20 * ratio,
    fontSize: 12 * ratio,
    color: colors.dusk,
    maxWidth: 134.2 * ratio,
    borderWidth: 1,
    borderColor: colors.paleGray,
    paddingHorizontal: 8 * ratio,
    paddingVertical: 4 * ratio,
  },
});

interface IItem {
  img: ImageSourcePropType;
  displayName: string;
  statusMsg: string;
}

interface ItemProps {
  style?: ViewStyle;
  item: IItem;
  onPress?: () => void;
  onLongPress?: () => void;
}

class Shared extends Component<ItemProps, any> {
  private static defaultProps: Partial<ItemProps> = {
    style: styles.wrapper,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  public render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={this.props.onPress}
          onLongPress={this.props.onLongPress}
        >
          <View style={this.props.style}>
            <Image style={styles.img} source={this.props.item.img ? this.props.item.img : IC_MASK}/>
            <Text style={styles.txt}>{this.props.item.displayName}</Text>
            {
              this.props.item.statusMsg
                ? <Text style={styles.txtRight}>{this.props.item.statusMsg}</Text>
                : null
            }
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Shared;
