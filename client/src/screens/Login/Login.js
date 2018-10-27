import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
/* import { bcrypt } from 'react-native-bcrypt'; */
import { client } from '../../App';
import { GET_USER } from '../../queries/user.queries';
import Grid from '../../styles/grid';
import LoginPanel from './LoginPanel';
import MainHeader from '../../components/MainHeader';

const bcrypt = require('react-native-bcrypt');

class Login extends Component {
  constructor(props) {
    super(props);
    const { screenProps } = this.props;
    console.log(screenProps.handler);
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
    const data = await client
      .query({
        query: GET_USER,
        variables: { email, encrypted },
      })
      .then(res => res.data.user)
      .catch(err => console.log('ERROR: ', err));
    console.log('@LOGIN->DATA: ', data);
    if (data !== null) screenProps.handler();
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
      <View style={Grid.grid}>
        <MainHeader styles={{ flex: 0.4 }} />
        <ScrollView style={{ flex: 0.6 }}>
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
    );
  }
}

export default Login;
