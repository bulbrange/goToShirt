import React from 'react';
import { View } from 'react-native';
import Grid from '../../styles/grid';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import TabText from '../../components/TabText';

const LoginPanel = ({ handlers, states }) => (
  <View style={[Grid.row, Grid.p0, { flex: 1 }]}>
    <View style={Grid.grid}>
      <FormInput placeholder="Email" handler={handlers.userHandler} value={states.email} />
      <FormInput
        placeholder="Password"
        handler={handlers.passwordHandler}
        value={states.password}
        secure
      />
      <FormButton title="Log in" handler={handlers.buttonHandler} />
      <TabText title="Not registered yet?" handler={handlers.tabHandler} />
    </View>
  </View>
);

export default LoginPanel;
