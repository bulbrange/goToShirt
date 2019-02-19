import React, { Component } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { client } from '../../../App';
import { GET_USER } from '../../../queries/user.queries';
import Grid from '../../../styles/grid';
import { Colors, RawColors } from '../../../styles/colors';
import LoginPanel from './LoginPanel';
import { store } from '../../../App';
import { setCurrentUser } from '../../../actions/auth.actions';
import Indicator from '../../../components/Indicator';

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
    const { login, dispatch } = this.props;
    this.setState({
      loading: true,
    });
    await login(email, password)
      .then(({ data: { login: user } }) => {
        dispatch(setCurrentUser(user));
        this.setState({
          loading: false,
        });
        dispatch(
          NavigationActions.navigate({
            routeName: 'MainTabNavigator',
          }),
        );
      })
      .catch((e) => {
        this.setState({
          loading: false,
        });
        Alert.alert(
          'Oooops',
          `Email or password is wrong... ${e.message}`,
          [{ text: 'Ok', onPress: () => console.log('OK Pressed') }],
          {
            cancelable: false,
          },
        );
      });
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
    const { email, password, loading } = this.state;
    // console.log(this.props);
    return (
      <View style={[Grid.grid, Colors.white]}>
        <View style={[Grid.row]}>
          {loading ? (
            <Indicator />
          ) : (
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
          )}
        </View>
      </View>
    );
  }
}

export default Login;
