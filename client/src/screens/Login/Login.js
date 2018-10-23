import React, { Component } from 'react';
import { View } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import Grid from '../../styles/grid';
import LoginPanel from './LoginPanel';
import MainHeader from '../../components/MainHeader';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  userHandler = (text) => {
    this.setState({
      username: text,
    });
  };

  passwordHandler = (text) => {
    this.setState({
      password: text,
    });
  };

  buttonHandler = () => console.log('Button working');

  tabHandler = () => {
    this.props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Register' })],
      }),
    );
  };

  render() {
    const { username, password } = this.state;

    return (
      <View style={Grid.grid}>
        <MainHeader styles={{ flex: 0.4 }} />
        <LoginPanel
          states={{ username, password }}
          handlers={{
            userHandler: this.userHandler,
            passwordHandler: this.passwordHandler,
            buttonHandler: this.buttonHandler,
            tabHandler: this.tabHandler,
          }}
        />
      </View>
    );
  }
}

export default Login;
