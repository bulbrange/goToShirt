import React from 'react';
import { View, Text } from 'react-native';

import Grid from '../styles/grid';

const TabText = ({ title, handler }) => (
  <View style={Grid.row}>
    <View style={Grid.col12}>
      <Text onPress={() => handler()} style={{ textAlign: 'center' }}>
        {title}
      </Text>
    </View>
  </View>
);
export default TabText;
