import React from 'react';
import { View } from 'react-native';
import Grid from '../../styles/grid';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import TabText from '../../components/TabText';

const RegisterPanel = ({ handlers, states, navigation }) => (
  <View style={[Grid.grid, Grid.alignItemsCenter]}>
    <View style={[Grid.row]}>
      <View style={[Grid.col10, { marginBottom: -20 }]}>
        <FormInput placeholder="User" handler={handlers.userHandler} value={states.username} />
      </View>
    </View>
    <View style={[Grid.row]}>
      <View style={[Grid.col10, { marginBottom: -20 }]}>
        <FormInput placeholder="Email" handler={handlers.emailHandler} value={states.email} />
      </View>
    </View>
    <View style={[Grid.row]}>
      <View style={[Grid.col10, { marginBottom: -20 }]}>
        <FormInput
          placeholder="Password"
          handler={handlers.passwordHandler}
          value={states.password}
          secure
        />
      </View>
    </View>
    <View style={[Grid.row]}>
      <View style={[Grid.col10, { marginBottom: -20 }]}>
        <FormInput
          placeholder="Repeat password"
          handler={handlers.repasswordHandler}
          value={states.repassword}
          secure
        />
      </View>
    </View>
    <View style={[Grid.row]}>
      <View style={[Grid.col9, { marginTop: 30 }]}>
        <FormButton title="Register" handler={handlers.buttonHandler} />
      </View>
    </View>
    <TabText title="Go back to login" handler={() => navigation.navigate('Login')} />
  </View>
);

export default RegisterPanel;
