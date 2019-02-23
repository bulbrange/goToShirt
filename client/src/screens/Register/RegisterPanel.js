import React from 'react';
import { View } from 'react-native';
import Grid from '../../styles/grid';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import TabText from '../../components/TabText';

const RegisterPanel = ({ handlers, props, navigation }) => (
  <View style={[Grid.grid, Grid.alignItemsCenter]}>
    <FormInput placeholder="User" handler={handlers.userHandler} value={props.username} />
    <FormInput placeholder="Email" handler={handlers.emailHandler} value={props.email} />
    <FormInput
      placeholder="Phone"
      handler={handlers.phoneHandler}
      value={props.phone}
      keyboardType="numeric"
    />
    <FormInput
      placeholder="Password"
      handler={handlers.passwordHandler}
      value={props.password}
      secure
    />

    <FormInput
      placeholder="Repeat password"
      handler={handlers.repasswordHandler}
      value={props.repassword}
      secure
    />

    <FormButton
      title="Register"
      handler={handlers.buttonHandler}
      loading={false /* loading */}
      auth={undefined}
      style={{
        borderWidth: 3,
        marginTop: 30,
        backgroundColor: 'transparent' /* bg */,
        opacity: 1 /* fadeOutLogin */,
      }}
      logedStyle={{ marginTop: 0, opacity: 1 /* fadeOutLogin */ }}
    />
    <TabText style={{}} title="Go back to login" handler={() => navigation.navigate('Login')} />
  </View>
);
export default RegisterPanel;
/*
      <View style={[Grid.col9, { marginTop: 30 }]}>
        <FormButton title="Register" handler={handlers.buttonHandler} />
      </View>
*/
