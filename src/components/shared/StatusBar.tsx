import React from 'react';
import {
  StatusBar,
  Platform,
  StatusBarStyle, 
} from 'react-native';
import { colors } from '@utils/Styles';

const Shared = ({isDarkContent}) => (
  <StatusBar 
    barStyle={Platform.select({
      ios: isDarkContent ? 'dark-content' : 'light-content', 
      android: 'light-content',
    })}
    backgroundColor={colors.darkBlue}/>
);
export default Shared;
