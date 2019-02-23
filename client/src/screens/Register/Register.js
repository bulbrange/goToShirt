import React, { Component } from 'react';
import {
  View, ScrollView, Alert, ImageBackground,
} from 'react-native';
import Grid from '../../styles/grid';
import RegisterPanel from './RegisterPanel';
import { Colors, RawColors } from '../../styles/colors';
import registerProtocol from './validation';
import MainHeader from '../../components/MainHeader';

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
    };
  }

  buttonHandler = async () => {
    const info = await registerProtocol(this.state);

    await Alert.alert(
      info.title,
      info.msg,
      [{ text: 'Ok', onPress: () => console.log('OK Pressed') }],
      {
        cancelable: false,
      },
    );

    if (info.success) {
      this.props.navigation.navigate('Login');
    }
  };

  tabHandler = () => this.props.navigation.navigate('Login');

  render() {
    const {
      username, email, password, repassword, phone,
    } = this.state;
    const { navigation } = this.props;
    return (
      <ImageBackground source={background} style={[Grid.grid, Colors.white]}>
        <MainHeader fontSize={40} initialFlex={0.3} />
        <View style={[Grid.row, { flex: 0.7, marginTop: -35 }]}>
          <ScrollView>
            <RegisterPanel
              props={{
                username,
                email,
                phone,
                password,
                repassword,
              }}
              handlers={{
                userHandler: text => this.setState({ username: text }),
                emailHandler: text => this.setState({ email: text }),
                phoneHandler: text => this.setState({ phone: text }),
                passwordHandler: text => this.setState({ password: text }),
                repasswordHandler: text => this.setState({ repassword: text }),
                buttonHandler: this.buttonHandler,
                tabHandler: this.tabHandler,
              }}
              navigation={navigation}
            />
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }
}

export default Register;
