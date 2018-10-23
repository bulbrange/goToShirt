import React, { Component } from 'react';
import { View } from 'react-native';
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

  tabHanlder = () => console.log('TAB WORKING');

  render() {
    const { username, password } = this.state;

    return (
      <View style={Grid.grid}>
        <MainHeader />
        <LoginPanel
          states={{ username, password }}
          handlers={{
            userHandler: this.userHandler,
            passwordHandler: this.passwordHandler,
            buttonHandler: this.buttonHandler,
            tabHandlerr: this.tabHanlder,
          }}
        />
      </View>
    );
  }
}

export default Login;
