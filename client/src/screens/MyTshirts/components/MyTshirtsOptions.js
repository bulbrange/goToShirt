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
    <IconButton
      name="times-circle"
      size={35}
      handler={() => this.props.onRemoveShirt(this.props.shirt)}
    />,
    <IconButton name="exchange-alt" size={35} handler={() => this.props.onChangeSide()} />,
    <IconButton name="share" size={35} handler={() => this.props.onSharePress()} />,
  ];

  initialPositionsIn = [
    { top: height / 2, left: width / 2 },
    { top: height / 2, left: width / 2 },
    { top: height / 2, left: width / 2 },
    { top: height / 2, right: width / 2 },
    { top: height / 2, right: width / 2 },
  ];

  finalPositionsIn = [
    { top: 0, left: 10 },
    { top: 60, left: 10 },
    { top: 120, left: 10 },
    { top: 0, right: 30 },
    { top: 60, right: 30 },
  ];

  constructor(props) {
    super(props);
    this.state = {
      share: true,
    };
  }

  findDimesions(layout) {
    const {
      x, y, width, height,
    } = layout;
    // console.warn(x);
    // console.warn(y);
    // console.warn(`width: ${width}`);
    // console.warn(`height: ${height}`);
  }

  render() {
    const {
      cancelHandler, shirt, navigate, share,
    } = this.props;

    const finalButtons = !share
      ? this.buttonsIn.slice(0, this.buttonsIn.length - 1)
      : this.buttonsIn;

    return (
      <TouchableOpacity
        ref={component => (this.optionsWrapper = component)}
        onLayout={(event) => {
          this.findDimesions(event.nativeEvent.layout);
        }}
        style={styles.wrapperOn}
        onPress={() => cancelHandler()}
      >
        <ButtonsAnimator
          buttons={finalButtons}
          initialPositions={this.initialPositionsIn}
          finalPositions={this.finalPositionsIn}
          duration={400}
          increse={100}
        />
      </TouchableOpacity>
    );
  }
}

export default MyTshirtsOptions;
