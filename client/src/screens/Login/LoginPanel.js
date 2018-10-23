import React from 'react';
import { View } from 'react-native';
import Grid from '../../styles/grid';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import TabText from '../../components/TabText';

const LoginPanel = ({ handlers, states }) => (
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

export default LoginPanel;
