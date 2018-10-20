import React from 'react';
import { View } from 'react-native';
import Grid from '../../styles/grid';
import FormInput from './FormInput';
import FormButton from './FormButton';
import TabText from './TabText';

const LogginPanel = ({ handlers, states }) => (
  <View style={[Grid.row, Grid.p0, { flex: 0.6 }]}>
    <View style={Grid.grid}>
      <FormInput placeholder="User" handler={handlers.userHandler} value={states.username} />
      <FormInput
        placeholder="Password"
        handler={handlers.passwordHandler}
        value={states.password}
        secure
      />
      <FormButton title="Log in" handler={handlers.buttonHandler} />
      <TabText title="Not registered yet?" handler={handlers.tabHanlder} />
    </View>
  </View>
);

export default LogginPanel;
