import React from 'react';
import { View } from 'react-native';
import Grid from '../../styles/grid';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import TabText from '../../components/TabText';

const placeHolders = ['User', 'Email', 'Phone', 'Password', 'Repeat password'];

const RegisterPanel = ({
  handlers, props, loading, navigation, success, actions,
}) => (
  <View style={[Grid.grid, Grid.alignItemsCenter]}>
    {placeHolders.map((holder, i) => (
      <FormInput
        placeholder={holder}
        handler={handlers[i]}
        value={props[i]}
        direction={i % 2 === 0 ? 'right' : 'left'}
        keyboardType={holder === 'Phone' ? 'numeric' : 'default'}
        isLoading={loading}
        init={success}
        secure={i > 2}
        key={i}
      />
    ))}
    <FormButton
      title="Register"
      handler={actions.buttonHandler}
      isLoading={loading}
      init={success}
      navigation={navigation}
      route="Login"
    />
    <TabText
      title="Go back to login"
      handler={() => navigation.navigate('Login')}
      isLoading={loading}
      init={success}
    />
  </View>
);
export default RegisterPanel;
