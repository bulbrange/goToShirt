import React from 'react';
import { View, Button } from 'react-native';
import Grid from '../../styles/grid';

const FormButton = ({ title, handler }) => (
  <View style={[Grid.row, Grid.p0]}>
    <View style={[Grid.col12, { padding: 20, marginTop: 40 }]}>
      <Button onPress={() => handler()} title={title} color="#D32B2B" />
    </View>
  </View>
);

export default FormButton;
