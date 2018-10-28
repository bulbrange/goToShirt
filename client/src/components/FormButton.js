import React from 'react';
import {
  View, Button, TouchableHighlight, Text,
} from 'react-native';
import Grid from '../styles/grid';
import Colors from '../styles/colors';

const FormButton = ({ title, handler }) => (
  <TouchableHighlight onPress={() => handler()}>
    <View style={[Colors.dark, { padding: 10, borderRadius: 3 }]}>
      <Text style={[Colors.whiteText, { textAlign: 'center', fontSize: 20, fontWeight: 'bold' }]}>
        {title}
      </Text>
    </View>
  </TouchableHighlight>
);

export default FormButton;
