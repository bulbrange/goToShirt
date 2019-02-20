import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { withNavigation } from 'react-navigation';

const TabText = ({ title, handler }) => (
  <TouchableOpacity onPress={() => handler()} style={{ flex: 1 }}>
    <Text style={{ textAlign: 'center' }}>{title}</Text>
  </TouchableOpacity>
);
export default withNavigation(TabText);
