import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../styles/colors';

const IconFont = args => (
  <Icon
    name={args.name}
    size={args.size}
    color={Colors.dark.backgroundColor}
    style={[
      {
        backgroundColor: 'transparent',
      },
      args.styles,
    ]}
  />
);

export default IconFont;
