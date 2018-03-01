import { Dimensions } from 'react-native';

const { width , height } = Dimensions.get('window');
const calRatio = (16 * (width / height));

export const screenWidth = width;
export const screenHeight = height;
export const ratio = (calRatio < 9 ? width / 9 : height / 18) / (360 / 9);

interface Icolors {
  dodgerBlue: string;
  dusk: string;
  blueyGray: string;
  cloudyBlue: string;
  paleGray: string;
}

export const colors: Icolors = {
  dodgerBlue: 'rgb(58,139,255)',
  dusk: 'rgb(65,77,107)',
  blueyGray: 'rgb(134,154,183)',
  cloudyBlue: 'rgb(175,194,219)',
  paleGray: 'rgb(233,237,244)',
};
