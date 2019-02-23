import React, { PureComponent } from 'react';
import { View, Animated } from 'react-native';
import { connect } from 'react-redux';
import Grid from '../../../styles/grid';
import FormInput from '../../../components/FormInput';
import FormButton from '../../../components/FormButton';
import TabText from '../../../components/TabText';

class LoginPanel extends PureComponent {
  render() {
    const {
      handlers, props, navigation, loading, auth,
    } = this.props;

    return (
      <View style={[Grid.grid, Grid.p0, Grid.alignItemsCenter]}>
        <FormInput
          defaultValue="andresherrerof@gmail.com"
          placeholder="Email"
          handler={handlers.userHandler}
          value={props.email}
          direction="right"
          isLoading={loading}
          style={{ marginTop: 30 }}
          init={auth.id}
        />
        <FormInput
          placeholder="Password"
          defaultValue="12345"
          handler={handlers.passwordHandler}
          value={props.password}
          secure
          direction="left"
          isLoading={loading}
          init={auth.id}
        />
        <FormButton
          title="Login"
          handler={handlers.buttonHandler}
          isLoading={loading}
          init={auth.id}
          navigation={navigation}
          route="MainTabNavigator"
        />
        <TabText
          title="Not registered yet?"
          handler={() => navigation.navigate('Register')}
          isLoading={loading}
          init={auth.id}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(mapStateToProps)(LoginPanel);
