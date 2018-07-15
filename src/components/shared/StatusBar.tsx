import React, { Component } from 'react';
import {
  StatusBar,
  Platform,
  StatusBarStyle, 
} from 'react-native';
import { colors } from '@utils/Styles';

interface IProps {
  isDarkContent: boolean;
}

class Shared extends Component<IProps, any> {
  private static defaultProps: Partial<IProps> = {
    isDarkContent: false,
  };

  public render() {
    const statusColor: StatusBarStyle = Platform.OS === 'android'
      ? 'default'
        : this.props.isDarkContent
          ? 'dark-content'
          : 'light-content';
    return (
      <StatusBar
        barStyle={statusColor}
        backgroundColor={colors.darkBlue}
      />
    );
  }
}

export default Shared;
