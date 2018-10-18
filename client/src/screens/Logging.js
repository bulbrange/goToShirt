import React, { Component } from 'react';
import { View } from 'react-native';
import Grid from '../styles/grid';
import LogginPanel from './components/LogginPanel';
import MainHeader from './components/MainHeader';

class Logging extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  userNameHandler = (text) => {
    this.setState({
      username: text,
    });
  };

  passwordHandler = (text) => {
    this.setState({
      password: text,
    });
  };

  render() {
    const { username, password } = this.state;
    const textInputAttrs = [
      {
        value: username,
        placeholder: 'User',
        handler: this.userNameHandler,
        pass: false,
      },
      {
        value: password,
        placeholder: 'Password',
        handler: this.passwordHandler,
        pass: true,
        styles: { marginBottom: 80 },
      },
    ];
    return (
      <View style={Grid.grid}>
        <MainHeader />
        <LogginPanel attrs={textInputAttrs} />
      </View>
    );
  }
}

export default Logging;
