import React, { Component } from 'react';
import { View, Animated } from 'react-native';
import { connect } from 'react-redux';
import Grid from '../../../styles/grid';
import FormInput from '../../../components/FormInput';
import FormButton from '../../../components/FormButton';
import TabText from '../../../components/TabText';

class LoginPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeOut: new Animated.Value(1),
      borderWidth: new Animated.Value(3),
      marginTop: new Animated.Value(20),
      backgroundColor: new Animated.Value(0),
      fadeOutLogin: new Animated.Value(1),
    };
  }

  componentWillReceiveProps(nextProps) {
    const { loading } = this.props;
    if (!nextProps.loading && !nextProps.auth.id) {
      this.resetStates();
    }
    if (nextProps.auth.id && loading) {
      this.startLoggedAnimation();
    }
  }

  resetStates = () => {
    const {
      fadeOut, borderWidth, marginTop, backgroundColor, fadeOutLogin,
    } = this.state;
    fadeOut.setValue(1);
    borderWidth.setValue(3);
    marginTop.setValue(20);
    backgroundColor.setValue(0);
    fadeOutLogin.setValue(1);
  };

  startLoggedAnimation = () => {
    const { navigation } = this.props;
    const { backgroundColor, fadeOutLogin } = this.state;
    Animated.timing(backgroundColor, {
      toValue: 1,
      duration: 600,
    }).start();
    setTimeout(() => {
      Animated.timing(fadeOutLogin, {
        toValue: 0,
        duration: 300,
      }).start(() => {
        setTimeout(() => {
          navigation.navigate('MainTabNavigator');
          this.resetStates();
        }, 650);
      });
    }, 1000);
  };

  render() {
    const {
      handlers, states, navigation, loading, auth,
    } = this.props;
    const {
      fadeOut, borderWidth, marginTop, backgroundColor, fadeOutLogin,
    } = this.state;
    const bg = backgroundColor.interpolate({
      inputRange: [0, 1],
      outputRange: ['transparent', 'white'],
    });

    return (
      <View style={[Grid.grid, Grid.p0, Grid.alignItemsCenter]}>
        <FormInput
          defaultValue="casas222@gmail.com"
          placeholder="Email"
          handler={handlers.userHandler}
          value={states.email}
          direction="right"
          isLoading={loading}
          style={{ marginTop: 30 }}
        />
        <FormInput
          placeholder="Password"
          defaultValue="12345"
          handler={handlers.passwordHandler}
          value={states.password}
          secure
          direction="left"
          isLoading={loading}
        />
        <FormButton
          title="Login"
          handler={handlers.buttonHandler}
          loading={loading}
          auth={auth}
          style={{
            borderWidth,
            marginTop,
            backgroundColor: bg,
            opacity: fadeOutLogin,
          }}
          logedStyle={{ marginTop, opacity: fadeOutLogin }}
        />
        <TabText
          title="Not registered yet?"
          handler={() => navigation.navigate('Register')}
          isLoading={loading}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(mapStateToProps)(LoginPanel);
