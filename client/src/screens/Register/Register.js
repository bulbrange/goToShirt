import React, { Component } from 'react';
import {
  View, ScrollView, Alert, ImageBackground,
} from 'react-native';
import { Grid } from '../../styles/grid';
import RegisterPanel from './RegisterPanel';
import { Colors } from '../../styles/colors';
import registerProtocol from './validation';
import MainHeader from '../../components/MainHeader';
import { SHORT_FUNCTION_DELAY, BUBBLE_TRANSITION_DELAY } from '../../constants/animation.constants';

const background = require('../../assets/icons/background.png');

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      phone: '',
      password: '',
      repassword: '',
      loading: false,
      success: false,
    };
  }

  buttonHandler = async () => {
    const { navigation } = this.props;
    this.setState({ loading: true });

    setTimeout(async () => {
      const info = await registerProtocol(this.state);
      this.setState({ loading: false, success: info.success });

      if (info.success) {
        setTimeout(() => {
          navigation.navigate('Login');
        }, BUBBLE_TRANSITION_DELAY);
      } else {
        await Alert.alert(
          info.title,
          info.msg,
          [{ text: 'Ok', onPress: () => console.log('OK Pressed') }],
          {
            cancelable: false,
          },
        );
      }
    }, SHORT_FUNCTION_DELAY);
  };

  render() {
    const {
      username, email, password, repassword, phone, loading, success,
    } = this.state;
    const { navigation } = this.props;
    return (
      <ImageBackground source={background} style={[Grid.grid, Colors.white]}>
        <MainHeader fontSize={40} initialFlex={0.3} isLoading={loading} init={success} />
        <View style={[Grid.row, { flex: 0.7, marginTop: -35 }]}>
          <ScrollView>
            <RegisterPanel
              props={[username, email, phone, password, repassword]}
              handlers={[
                text => this.setState({ username: text }),
                text => this.setState({ email: text }),
                text => this.setState({ phone: text }),
                text => this.setState({ password: text }),
                text => this.setState({ repassword: text }),
              ]}
              actions={{
                buttonHandler: this.buttonHandler,
              }}
              navigation={navigation}
              loading={loading}
              success={success}
            />
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }
}

export default Register;
