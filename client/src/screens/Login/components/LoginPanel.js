import React, { Component } from 'react';
import { View, Animated } from 'react-native';
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
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading) {
      this.setState({
        margin: new Animated.Value(0),
        fadeOut: new Animated.Value(1),
      });
    }
  }

  startAnimation = () => {
    Animated.timing(this.state.margin, {
      toValue: 500,
      duration: 500,
    }).start();
    Animated.timing(this.state.fadeOut, {
      toValue: 0,
      duration: 300,
    }).start();
  };

  render() {
    const {
      handlers, states, navigation, loading,
    } = this.props;
    const { margin, fadeOut } = this.state;
    if (loading) this.startAnimation();

    return (
      <View style={[Grid.grid, Grid.alignItemsCenter]}>
        <View style={[Grid.row, Grid.alignItemsCenter, { marginTop: 30 }]}>
          <Animated.View style={[Grid.col10, { marginBottom: -20, marginRight: margin }]}>
            <FormInput
              defaultValue="casas222@gmail.com"
              placeholder="Email"
              handler={handlers.userHandler}
              value={states.email}
            />
          </Animated.View>
        </View>
        <View style={[Grid.row, Grid.alignItemsCenter]}>
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

        <FormButton title="Login" handler={handlers.buttonHandler} loading={loading} />
        <Animated.View style={{ marginTop: 20, opacity: fadeOut }}>
          <TabText title="Not registered yet?" handler={() => navigation.navigate('Register')} />
        </Animated.View>
      </View>
    );
  }
}

/* const LoginPanel = ({
  handlers, states, navigationm, loading,
}) => (

); */

export default LoginPanel;

/*

    <TouchableOpacity
      onPress={() => navigation.navigate('Register')}
      style={[Grid.row, Grid.alignItemsCenter, Grid.p0, { marginTop: 0 }]}
    >
      <View style={[Grid.col9]}>
        <Text style={{ textAlign: 'center' }}>Not registered yet?</Text>
      </View>
    </TouchableOpacity>

    */
