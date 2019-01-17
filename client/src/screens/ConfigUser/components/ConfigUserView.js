/* eslint-disable space-before-blocks */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import ConfigViewUser from '../../../components/ConfigViewUser';

const styles = StyleSheet.create({

});

class ConfigUserView extends Component {
  constructor(props){
    super(props);
    this.state = {
      edit: true,
      visible: true,
    };
  }

  render(){
    return(
      <View>
        <ConfigViewUser edit={this.state.edit} visible={this.state.visible}/>
      </View>
    );
  }
}

export default ConfigUserView;
