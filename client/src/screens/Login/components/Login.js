import React, { Component } from 'react';
import {
  View, ScrollView, Alert, ImageBackground,
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { client } from '../../../App';
import { GET_USER } from '../../../queries/user.queries';
import Grid from '../../../styles/grid';
import { Colors, RawColors } from '../../../styles/colors';
import LoginPanel from './LoginPanel';
import { store } from '../../../App';
import { setCurrentUser } from '../../../actions/auth.actions';
import Indicator from '../../../components/Indicator';
import MainHeader from '../../../components/MainHeader';

const bcrypt = require('react-native-bcrypt');
const background = require('../../../assets/icons/background.png');

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
    const { navigation } = this.props;
    // console.log(this.props);
    // https://cdn-images-1.medium.com/max/1600/0*3IFEy-hfoIpgFjBl.gif
    // http://homemirresistivel.com/wp-content/uploads/2017/01/souveraen-black-red-dark.jpg
    return (
      <ImageBackground source={background} style={[Grid.grid, Colors.white]}>
        <MainHeader fontSize={40} />
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

/*

          {loading ? (
            <Indicator />
          ) : (

)}
        <View style={[Grid.row, Grid.p0, { flex: 0.4 }]}>
          <MainHeader />
        </View>

*/
