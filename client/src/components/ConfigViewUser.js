/* eslint-disable space-before-blocks */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { View, StyleSheet, Text, ImageBackground } from 'react-native';
import FormInput from './FormInput';
import FormButton from './FormButton';

const styles = StyleSheet.create({
  userImage: {
    width: 400,
    height: 280,
  },

  titleConfig: {
    marginTop: 230,
    marginLeft: 10,
    fontSize: 32,
    color: '#FFF',
    fontWeight: 'bold',
  },
  textDelete: {
    color: '#ea0202',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

class ConfigViewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      edit: true,
    }
  }

  render(){
    return (
      <View>
          <ImageBackground source={{ uri: 'https://i.ytimg.com/vi/ii2Zmr_w-EA/hqdefault.jpg' }} style={styles.userImage}>
            <Text style={styles.titleConfig}>Bocaseca-man</Text>
          </ImageBackground>
        <View>
          <FormInput editable={this.state.edit} placeholder="Username" />
          <FormInput editable={this.state.edit} placeholder="Email" />
          {(this.state.visible) ?
          <View>
            <FormButton title="Change Password"/>
            <FormButton title="Change Email"/>
          </View>
            : null
          }
        </View>
        <View>
          {(this.state.visible) ?
            <View>
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
