import React, { Component } from 'react';
import { View, ScrollView, Alert, ImageBackground } from 'react-native';
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
      username, email, password, repassword,
    } = this.state;
    const { navigation } = this.props;
    return (
      <ImageBackground source={background} style={[Grid.grid, Colors.white]}>
        <MainHeader fontSize={40} flex={0.4} />
        <View style={[Grid.row, { marginTop: 30 }]}>
          <ScrollView>
            <RegisterPanel
              states={{
                username,
                email,
                password,
                repassword,
              }}
              handlers={{
                userHandler: text => this.setState({ username: text }),
                emailHandler: text => this.setState({ email: text }),
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
