import React from 'react';
import { View } from 'react-native';
import Grid from '../../styles/grid';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import TabText from '../../components/TabText';

const RegisterPanel = ({ handlers, states }) => (
  <View style={[Grid.row, Grid.p0, { flex: 1 }]}>
    <View style={Grid.grid}>
      <FormInput placeholder="User" handler={handlers.userHandler} value={states.username} />
      <FormInput placeholder="Email" handler={handlers.emailHandler} value={states.email} />
      <FormInput
        placeholder="Password"
        handler={handlers.passwordHandler}
        value={states.password}
        secure
      />
      <FormInput
        placeholder="Repeat password"
        handler={handlers.repasswordHandler}
        value={states.repassword}
        secure
      />
      <FormButton title="Register" handler={handlers.buttonHandler} />
      <TabText title="Cancel" handler={handlers.tabHandler} />
    </View>
  </View>
);

export default RegisterPanel;
