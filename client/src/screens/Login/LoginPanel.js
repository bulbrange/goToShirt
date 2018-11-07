import React from 'react';
import { View, ScrollView } from 'react-native';
import Grid from '../../styles/grid';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import TabText from '../../components/TabText';

const LoginPanel = ({ handlers, states }) => (
  <View style={[Grid.grid, Grid.justifyBetween]}>
    <View style={[Grid.row, Grid.alignItemsCenter]}>
      <View style={[Grid.col12]}>
        <FormInput placeholder="Email" handler={handlers.userHandler} value={states.email} />
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
    <View style={[Grid.row, Grid.alignItemsCenter, { marginTop: 30 }]}>
      <View style={[Grid.col12]}>
        <FormButton title="Log in" handler={handlers.buttonHandler} />
      </View>
    </View>
  </View>
);

export default LoginPanel;
