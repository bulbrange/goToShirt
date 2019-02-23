/* eslint-disable react/prop-types */
/* eslint-disable space-before-blocks */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import {
  View, StyleSheet, Text, ImageBackground, ActivityIndicator, Button,
} from 'react-native';
import FormInput from './FormInput';
import FormButton from './FormButton';

const styles = StyleSheet.create({
  userImage: {
    width: 400,
    height: 280,
  },

  changeButton: {
    marginTop: 5,
  },

  titleConfig: {
    marginTop: 230,
    marginLeft: 10,
    fontSize: 32,
    color: '#FFF',
    fontWeight: 'bold',
  },
  textDelete: {
    marginTop: 5,
    justifyContent: 'center', 
    backgroundColor: '#ea0202',
    color: '#FFF',
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: 20,
    width: 150,
  },
});

class ConfigViewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      change: false,
    };
  }

  async componentDidMount(){
    const { userById } = this.props;
    if (userById) {
      await this.setState({
        avatar: userById.avatar,
        username: userById.username,
        email: userById.email,
      });
    }
  }

  async componentWillReceiveProps(nextProps){
    console.log('@next', nextProps);
    if (nextProps.userById) {
      await this.setState({
        avatar: nextProps.userById.avatar,
        username: nextProps.userById.username,
        email: nextProps.userById.email,
      });
    }
  }

  firtsMayus = string => string.charAt(0).toUpperCase() + string.slice(1)

  checkChange = () => {
    if (this.state.change === false){
      this.setState({ change: true });
    } else {
      this.setState({ change: false });
    }
  }

  render(){
    const {
      avatar, editable, username, email,
    } = this.props;

    if (!username) return (<ActivityIndicator size="large" color="#0000ff" />);
    return (
      <View>
          <ImageBackground source={{ uri: avatar }} style={styles.userImage}>
            <Text style={styles.titleConfig}>{ this.firtsMayus(username) }</Text>
          </ImageBackground>
        <View>
          <FormInput editable={editable} placeholder={username} />
          <FormInput editable={editable} placeholder={email} />
          {editable ? 
            <View>
              <Button color="#FF1F72" title="Change Password" onPress={this.checkChange} />
            </View>
            : null
          }
          { this.state.change
            ?
              <View>
                <FormInput placeholder="Old Password" />
                <FormInput placeholder="Verify Password" />
                <FormButton />
              </View>
            : null
          }
        </View>
        <View>
          {editable
            ? <View>
            <Text style={styles.textDelete}>Delete User</Text>
              </View>
            : null
          }
        </View>
      </View>
    );
  }
}
export default ConfigViewUser;
