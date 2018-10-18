import React from 'react';
import { View, Button } from 'react-native';
import Grid from '../../styles/grid';
import FormTextInput from './FormTextInput';

const LogginPanel = ({ attrs }) => (
  <View style={[Grid.row, Grid.p0, { flex: 0.6 }]}>
    <View style={Grid.grid}>
      {attrs.map(attr => (
        <FormTextInput
          key={attr.placeholder}
          value={attr.value}
          placeholder={attr.placeholder}
          handler={attr.handler}
          pass={attr.pass}
          styles={attr.styles}
        />
      ))}

      <View style={[Grid.row, Grid.p0]}>
        <View style={[Grid.col12, { padding: 20 }]}>
          <Button onPress={() => console.log('JANDER')} title="Log in" color="#D32B2B" />
        </View>
      </View>
    </View>
  </View>
);

export default LogginPanel;
