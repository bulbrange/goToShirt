import React from 'react';
import { View, Text } from 'react-native';

import {
  createStackNavigator,
  StackActions,
  NavigationActions,
  withNavigation,
} from 'react-navigation';
import Grid from '../styles/grid';

const TabText = ({ title, handler }) => (
  <Text onPress={() => handler()} style={{ textAlign: 'center' }}>
    {title}
  </Text>
);
export default withNavigation(TabText);
