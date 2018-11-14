import { StyleSheet } from 'react-native';

/*
const RawColors = {
  primary: '#006064',
  light: '#428e92',
  dark: '#00363a',
  white: '#FFF',
  black: 'black',
};
*/
const RawColors = {
  primary: '#651fff',
  light: '#949494',
  dark: '#040303',
  white: '#C4C3C3',
  black: 'black',
};

const Colors = StyleSheet.create({
  primary: {
    backgroundColor: RawColors.primary,
  },
  primaryBorder: {
    borderColor: RawColors.primary,
  },
  light: {
    backgroundColor: RawColors.light,
  },
  dark: {
    backgroundColor: RawColors.dark,
  },
  white: {
    backgroundColor: RawColors.white,
  },
  whiteText: {
    color: RawColors.white,
  },
  blackText: {
    color: RawColors.black,
  },
});

export default Colors;
export { RawColors, Colors };
