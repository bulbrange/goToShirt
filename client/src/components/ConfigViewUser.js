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

  formEdit: {
    height: 20,
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
          <FormInput style={styles.formEdit} editable={editable} placeholder={username} />
          <FormInput style={styles.formEdit} editable={editable} placeholder={email} />
          {editable ? 
            <View>
              <FormButton title="Change Password" handler={this.checkChange} />
            </View>
            : null
          }
          { this.state.change
            ?
              <View style={styles.viewChange}>
                <FormInput placeholder="New Password" />
                <FormInput placeholder="Verify Password" />
                <FormButton title="Save" />
              </View>
            : null
          }
        </View>
        <View>
          {editable
            ? <View>
                <Button color="#FF1100" style={styles.textDelete} title="Delete User" />
                <Button color="#FFA00D" style={styles.textDelete} title="Log Out" />
              </View>
            : null
          }
        </View>
      </View>
    );
  }
}
export default ConfigViewUser;
