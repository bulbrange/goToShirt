import React, { Component } from 'react';
import {
  View, ScrollView, Alert, ImageBackground,
} from 'react-native';
import { Grid } from '../../../styles/grid';
import { Colors } from '../../../styles/colors';
import LoginPanel from './LoginPanel';
import { setCurrentUser, logout } from '../../../actions/auth.actions';
import MainHeader from '../../../components/MainHeader';
import BubbleTransition from '../../../components/BubbleTransition';

const background = require('../../../assets/icons/background.png');

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'casas222@gmail.com',
      password: '12345',
    };
  }

  buttonHandler = async () => {
    const { email, password } = this.state;
    const { login, dispatch } = this.props;
    await dispatch(logout());
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      login(email, password)
        .then(({ data: { login: user } }) => {
          dispatch(setCurrentUser(user));
          this.setState({
            loading: false,
          });
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
    }, 500);
  };

  render() {
    const { email, password, loading } = this.state;
    const { navigation, auth } = this.props;

    return (
      <ImageBackground source={background} style={[Grid.grid, Colors.white]}>
        <MainHeader fontSize={40} isLoading={loading} />
        <BubbleTransition init={auth.id} />
        <View style={[Grid.row]}>
          <ScrollView contentContainerStyle={Grid.p0}>
            <LoginPanel
              states={{ email, password }}
              handlers={{
                userHandler: text => this.setState({ email: text }),
                passwordHandler: text => this.setState({ password: text }),
                buttonHandler: this.buttonHandler,
                tabHandler: () => navigation.navigate('Register'),
              }}
              navigation={navigation}
              loading={loading}
            />
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }
}

export default Login;
