import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Image,
  Text,
  View,
} from 'react-native';

import { ratio, colors } from '@utils/Styles';

class Shared extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  public render() {
    return (
      <View
        style={{
          flex: 1,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'stretch',
        }}
      >
        <Text
          style={[
            {
              fontSize: 14 * ratio,
              color: 'rgb(155,155,155)',
              alignSelf: 'center',
            },
          ]}
        >{this.props.children}</Text>
      </View>
    );
  }
}

export default Shared;
