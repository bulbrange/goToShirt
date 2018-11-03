// name handler size
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../styles/colors';

const IconButton = args => (
  <Icon
    name={args.name}
    size={args.size}
    color={Colors.dark.backgroundColor}
    onPress={() => args.handler()}
    style={{
      backgroundColor: 'transparent',
      paddingLeft: 10,
    }}
  />
);

export default IconButton;
