import React from 'react';
import {
  TouchableOpacity,
  Image,
} from 'react-native';
import { colors } from '@utils/Styles';
import { IC_DISMISS } from '@utils/Icons';

export const commonNavigationOptions = {
  headerBackTitle: null,
  headerStyle: {
    backgroundColor: colors.dodgerBlue, 
    borderBottomColor: 'transparent', 
    borderBottomWidth: 0, 
    elevation: 0,
  },
  headerTitleStyle: {color: 'white'},
  headerTintColor: 'white', 
};

export const DismissButton = ({navigation, style}) => (
  <TouchableOpacity style={[{width: 24, height: 24, left: 14}, style]} onPress={() => navigation.dismiss()}>
    <Image 
      style={{width: '100%', height: '100%', tintColor: 'white'}} 
      source={IC_DISMISS}/>
  </TouchableOpacity>);

export const commonNavigationOptionsForModal = (props) => ({
    ...commonNavigationOptions, 
    headerLeft: <DismissButton navigation={props.navigation}/>,
});
