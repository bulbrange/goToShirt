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
      margin: new Animated.Value(0),
      fadeOut: new Animated.Value(1),
      borderWidth: new Animated.Value(3),
      marginTop: new Animated.Value(10),
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
      margin, fadeOut, borderWidth, marginTop, backgroundColor, fadeOutLogin,
    } = this.state;
    margin.setValue(0);
    fadeOut.setValue(1);
    borderWidth.setValue(3);
    marginTop.setValue(10);
    backgroundColor.setValue(0);
    fadeOutLogin.setValue(1);
  };

  startAnimation = () => {
    const { margin, fadeOut } = this.state;
    Animated.timing(margin, {
      toValue: 550,
      duration: 500,
    }).start();
    Animated.timing(fadeOut, {
      toValue: 0,
      duration: 300,
    }).start();
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
      margin, fadeOut, borderWidth, marginTop, backgroundColor, fadeOutLogin,
    } = this.state;
    const bg = backgroundColor.interpolate({
      inputRange: [0, 1],
      outputRange: ['transparent', 'white'],
    });
    if (loading) this.startAnimation();
    return (
      <View style={[Grid.grid, Grid.p0, Grid.alignItemsCenter]}>
        <View style={[Grid.row, Grid.p0, Grid.alignItemsCenter, { marginTop: 30 }]}>
          <Animated.View style={[Grid.col10, { marginBottom: -20, marginRight: margin }]}>
            <FormInput
              defaultValue="casas222@gmail.com"
              placeholder="Email"
              handler={handlers.userHandler}
              value={states.email}
            />
          </Animated.View>
        </View>
        <View style={[Grid.row, Grid.p0, Grid.alignItemsCenter]}>
          <Animated.View style={[Grid.col10, { marginLeft: margin }]}>
            <FormInput
              placeholder="Password"
              defaultValue="12345"
              handler={handlers.passwordHandler}
              value={states.password}
              secure
            />
          </Animated.View>
        </View>

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
        <Animated.View style={{ marginTop: 20, opacity: fadeOut }}>
          <TabText title="Not registered yet?" handler={() => navigation.navigate('Register')} />
        </Animated.View>
      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(mapStateToProps)(LoginPanel);
