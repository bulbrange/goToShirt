import React, { Component } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { client } from '../../App';
import { GET_USER } from '../../queries/user.queries';
import Grid from '../../styles/grid';
import { Colors, RawColors } from '../../styles/colors';
import LoginPanel from './LoginPanel';

const bcrypt = require('react-native-bcrypt');

class Login extends Component {
  constructor(props) {
    super(props);
    const { screenProps } = this.props;
    this.state = {
      email: '',
      password: '',
    };
  }

  userHandler = (text) => {
    this.setState({
      email: text,
    });
  };

  passwordHandler = (text) => {
    this.setState({
      password: text,
    });
  };

  buttonHandler = async () => {
    const { email, password } = this.state;
    const { screenProps } = this.props;
    const encrypted = bcrypt.hashSync(password, 10);
    const user = await client
      .query({
        query: GET_USER,
        variables: { email, password },
      })
      .then(res => res.data.user)
      .catch(err => console.log('ERROR: ', err));
    console.log('@LOGIN->DATA: ', user);
    if (user !== null) {
      screenProps.userHandler(user.id, user.username);
      screenProps.handler();
    } else {
      Alert.alert(
        'Oooops',
        'Email or password is wrong...',
        [{ text: 'Ok', onPress: () => console.log('OK Pressed') }],
        {
          cancelable: false,
        },
      );
    }
  };

  tabHandler = () => {
    this.props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Register' })],
      }),
    );
  };

  render() {
    const { email, password } = this.state;

    return (
      <View style={[Grid.grid, Colors.white]}>
        <View style={[Grid.row]}>
          <ScrollView>
            <LoginPanel
              states={{ email, password }}
              handlers={{
                userHandler: this.userHandler,
                passwordHandler: this.passwordHandler,
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

export default Login;
