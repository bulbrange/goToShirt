import React from 'react';
import { View } from 'react-native';
import Grid from '../../styles/grid';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import TabText from '../../components/TabText';

const RegisterPanel = ({ handlers, states }) => (
  <View style={[Grid.grid, Grid.justifyBetween]}>
    <View style={[Grid.row, Grid.alignItemsCenter]}>
      <View style={[Grid.col12]}>
        <FormInput placeholder="User" handler={handlers.userHandler} value={states.username} />
      </View>
    </View>
    <View style={[Grid.row, Grid.alignItemsCenter]}>
      <View style={[Grid.col12]}>
        <FormInput placeholder="Email" handler={handlers.emailHandler} value={states.email} />
      </View>
    </View>
    <View style={[Grid.row, Grid.alignItemsCenter]}>
      <View style={[Grid.col12]}>
        <FormInput
          placeholder="Password"
          handler={handlers.passwordHandler}
          value={states.password}
          secure
        />
      </View>
    </View>
    <View style={[Grid.row, Grid.alignItemsCenter]}>
      <View style={[Grid.col12]}>
        <FormInput
          placeholder="Repeat password"
          handler={handlers.repasswordHandler}
          value={states.repassword}
          secure
        />
      </View>
    </View>
    <View style={[Grid.row, Grid.alignItemsCenter]}>
      <View style={[Grid.col12, { marginTop: 30 }]}>
        <FormButton title="Register" handler={handlers.buttonHandler} />
      </View>
    </View>
  </View>
);

export default RegisterPanel;
