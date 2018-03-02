import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Image,
  Text,
  View,
} from 'react-native';

import { ratio, colors } from '@utils/Styles';
import Modal from 'react-native-modalbox';

const styles: any = StyleSheet.create({
  wrapper: {
    backgroundColor: 'transparent',

    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14 * ratio,
  },
});

interface ItemProps {
  style?: View.propTypes.style;
  textStyle?: Text.propTypes.style;
  activeOpacity?: number;
}

class Shared extends Component<ItemProps, any> {
  private static defaultProps: Partial<ItemProps> = {
    activeOpacity: 0.5,
    style: styles.wrapper,
    textStyle: styles.text,
  };

  private modal: any;

  constructor(props) {
    super(props);
    this.state = {
    };
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
        backdropOpacity={0.2}
        entry={'top'}
        position={'top'}
        style={styles.modal}
      >
        <View
          style={ styles.modalView }
        />
      </Modal>
    );
  }
}

export default Shared;
