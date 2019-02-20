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
  primary: '#546e7a',
  light: '#819ca9',
  dark: '#29434e',
  dark2: '#2a2a2a',
  dark3: '#4f4f4f',
  dark4: '#9f9f9f',
  white: '#FFF',
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
  dark2: {
    backgroundColor: RawColors.dark2,
  },
  dark3: {
    backgroundColor: RawColors.dark3,
  },
  dark4: {
    backgroundColor: RawColors.dark4,
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
  shadow: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'transparent',
    borderBottomWidth: 0,
    borderRightWidth: 0,
    shadowColor: '#ffffff',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5,
  },
});

const RawColors2 = {
  primary: '#341CAD',
  light: '#8A8FEA',
  dark: '#1118A0',
  dark2: '#251189',
  dark3: '#1B0B6C',
  dark4: '#9f9f9f',
  white: '#FFF',
  black: 'black',
};

const Colors2 = StyleSheet.create({
  primary: {
    backgroundColor: RawColors2.primary,
  },
  primaryBorder: {
    borderColor: RawColors2.primary,
  },
  light: {
    backgroundColor: RawColors2.light,
  },
  dark: {
    backgroundColor: RawColors2.dark,
  },
  dark2: {
    backgroundColor: RawColors2.dark2,
  },
  dark3: {
    backgroundColor: RawColors2.dark3,
  },
  dark4: {
    backgroundColor: RawColors2.dark4,
  },
  white: {
    backgroundColor: RawColors2.white,
  },
  whiteText: {
    color: RawColors.white,
  },
  blackText: {
    color: RawColors.black,
  },
  shadow: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'transparent',
    borderBottomWidth: 0,
    borderRightWidth: 0,
    shadowColor: '#ffffff',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5,
  },
});

export default Colors;
export {
  RawColors, Colors, Colors2, RawColors2,
};
