import React, { Component } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import Grid from '../../styles/grid';
import RegisterPanel from './RegisterPanel';
import { Colors, RawColors } from '../../styles/colors';
import { NEW_USER } from '../../queries/user.queries';
import registerProtocol from './validation';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      repassword: '',
    };
  }

  userHandler = (text) => {
    this.setState({
      username: text,
    });
  };

  emailHandler = (text) => {
    this.setState({
      email: text,
    });
  };

  passwordHandler = (text) => {
    this.setState({
      password: text,
    });
  };

  repasswordHandler = (text) => {
    this.setState({
      repassword: text,
    });
  };

  buttonHandler = async () => {
    const info = await registerProtocol(this.state);

    await Alert.alert(
      info.title,
      info.msg,
      [{ text: 'Ok', onPress: () => console.log('OK Pressed') }],
      {
        cancelable: false,
      },
    );

    if (info.success) {
      this.props.navigation.navigate('Login');
    }
  };

  tabHandler = () => this.props.navigation.navigate('Login');

  render() {
    const {
      username, email, password, repassword,
    } = this.state;
    return (
      <View style={[Grid.grid, Colors.white]}>
        <View style={[Grid.row]}>
          <ScrollView>
            <RegisterPanel
              states={{
                username,
                email,
                password,
                repassword,
              }}
              handlers={{
                userHandler: this.userHandler,
                emailHandler: this.emailHandler,
                passwordHandler: this.passwordHandler,
                repasswordHandler: this.repasswordHandler,
                buttonHandler: this.buttonHandler,
                tabHandler: this.tabHandler,
              }}
            />
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default Register;
