import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Alert,
  ImageBackground,
  Animated,
  Dimensions,
  Image,
} from 'react-native';
import Grid from '../../../styles/grid';
import { Colors } from '../../../styles/colors';
import LoginPanel from './LoginPanel';
import { setCurrentUser, logout } from '../../../actions/auth.actions';
import MainHeader from '../../../components/MainHeader';
import { AUTH_RESET_DELAY } from '../../../constants/animation.constants';

const background = require('../../../assets/icons/background.png');

const { height, width } = Dimensions.get('window');

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'casas222@gmail.com',
      password: '12345',
      flex: new Animated.Value(0.4),
      scale: new Animated.Value(1),
      fadeIn: new Animated.Value(0),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.id) {
      this.bubbleAnimation();
      setTimeout(() => {
        this.state.flex.setValue(0.4);
        this.state.scale.setValue(1);
        this.state.fadeIn.setValue(0);
      }, AUTH_RESET_DELAY);
    }
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

  headerAnimation = () => {
    const { flex } = this.state;
    Animated.timing(flex, {
      toValue: 0,
      duration: 300,
    }).start();
  };

  bubbleAnimation = () => {
    const { fadeIn, scale } = this.state;
    setTimeout(() => {
      Animated.timing(fadeIn, {
        toValue: 10,
        duration: 400,
      }).start();
      Animated.timing(scale, {
        toValue: 20,
        duration: 400,
      }).start();
    }, 1500);
  };

  render() {
    const {
      email, password, loading, flex, scale, fadeIn,
    } = this.state;
    const { navigation, auth } = this.props;
    // loading ? this.headerAnimation() : !auth.id ? flex.setValue(0.4) : null;

    return (
      <ImageBackground source={background} style={[Grid.grid, Colors.white]}>
        <MainHeader fontSize={40} isLoading={loading} />
        <Animated.View
          style={{
            position: 'absolute',
            zIndex: 10,
            top: height / 2 - 25,
            left: width / 2 - 25,
            borderRadius: 100,
            backgroundColor: 'white',
            width: 50,
            height: 50,
            transform: [{ scale }],
            opacity: fadeIn,
          }}
        />
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
