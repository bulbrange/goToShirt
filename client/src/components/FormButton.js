import React from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import { Colors, RawColors } from '../styles/colors';

const FormButton = ({ title, handler }) => (
  <TouchableHighlight onPress={() => handler()}>
    <View
      style={[
        {
          padding: 10,
          borderRadius: 3,
          borderWidth: 1,
          borderColor: RawColors.primary,
        },
      ]}
    >
      <Text
        style={[
          {
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            color: RawColors.dark,
          },
        ]}
      >
        {title}
      </Text>
    </View>
  </TouchableHighlight>
);

export default FormButton;
