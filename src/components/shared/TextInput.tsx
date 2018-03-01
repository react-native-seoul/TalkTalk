import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Image,
  Text,
  TextInput,
  View,
} from 'react-native';

import { ratio, bgColor } from '@utils/Styles';

const styles: any = StyleSheet.create({
  wrapper: {
    alignSelf: 'stretch',

    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  input: {
    alignSelf: 'stretch',
    color: 'rgb(65,77,107)',
    fontSize: 16 * ratio,
    paddingVertical: 22 * ratio,
    paddingHorizontal: 20 * ratio,
    borderWidth: 1,
    borderColor: 'rgb(233,237,244)',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

interface ItemProps {
  labelStyle?: Text.propTypes.style;
  placeholderTextColor?: string;

  isPassword?: boolean;
  multiline?: boolean;
  txtLabel?: string;
  txtHint?: string;
  txt?: string;
  onFocus?: () => void;
  onTextChanged?: (text) => void;
  onSubmitEditing?: (text) => void;
  returnKeyType?: any;
}

class Shared extends Component<ItemProps, any> {
  private static defaultProps: Partial<ItemProps> = {
    labelStyle: styles.label,
    placeholderTextColor: 'rgb(134,154,183)',
    isPassword: false,
    multiline: false,
    txtLabel: '',
    txtHint: '',
    txt: '',
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  public render() {
    return (
      <View style={[
        styles.wrapper,
        this.props.style,
      ]}>
        <TextInput
          style={[
            styles.input,
            this.props.inputStyle,
          ]}
          underlineColorAndroid='transparent' // android fix
          autoCapitalize='none'
          autoCorrect={false}
          multiline={this.props.multiline}
          onChangeText={this.props.onTextChanged}
          value={this.props.txt}
          placeholder={this.props.txtHint}
          placeholderTextColor={this.props.placeholderTextColor}
          onSubmitEditing={this.props.onSubmitEditing}
          returnKeyType={this.props.returnKeyType}
          secureTextEntry={this.props.isPassword}
        />
      </View>
    );
  }
}

export default Shared;
