import React from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import Colors from '../styles/colors';

const ButtonEdit = ({ title, handler }) => (
  <TouchableHighlight onPress={() => handler()}>
    <View
      style={[
        Colors.dark,
        {
          padding: 10,
          borderRadius: 50,
          width: 50,
          height: 50,
        },
      ]}
    >
      <Text style={[Colors.whiteText, { textAlign: 'center', fontSize: 20, fontWeight: 'bold' }]}>
        {title}
      </Text>
    </View>
  </TouchableHighlight>
);

export default ButtonEdit;
