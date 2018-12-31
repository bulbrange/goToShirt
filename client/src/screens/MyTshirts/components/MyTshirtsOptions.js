import React, { Component } from 'react';
import {
  TouchableOpacity, Dimensions, StyleSheet, Animated, View,
} from 'react-native';
import IconButton from '../../../components/IconButton';
import ButtonsAnimator from '../../../components/ButtonsAnimator';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapperOn: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    zIndex: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
  },
});

class MyTshirtsOptions extends Component {
  buttonsIn = [
    <IconButton
      name="edit"
      size={35}
      handler={() => this.props.navigate('EditShirt', { shirtID: this.props.shirt.id })}
    />,
    <IconButton
      name="eye"
      size={35}
      handler={() => this.props.navigate('WebViewer', {
        shirtID: this.props.shirt.id,
        shirtName: this.props.shirt.name,
      })
      }
    />,
    <IconButton name="backspace" size={35} handler={() => console.log('option3!')} />,
  ];

  initialPositionsIn = [
    { top: height / 2, left: width / 2 },
    { top: height / 2, left: width / 2 },
    { top: height / 2, left: width / 2 },
  ];

  finalPositionsIn = [{ top: 180, left: 10 }, { top: 245, left: 10 }, { top: 310, left: 10 }];

  render() {
    const { cancelHandler, shirtID, navigate } = this.props;
    return (
      <TouchableOpacity style={styles.wrapperOn} onPress={() => cancelHandler()}>
        <ButtonsAnimator
          buttons={this.buttonsIn}
          initialPositions={this.initialPositionsIn}
          finalPositions={this.finalPositionsIn}
          duration={500}
          increse={200}
        />
      </TouchableOpacity>
    );
  }
}

export default MyTshirtsOptions;
