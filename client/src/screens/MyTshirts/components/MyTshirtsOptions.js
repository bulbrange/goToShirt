import React, { Component } from 'react';
import {
  TouchableOpacity, Dimensions, StyleSheet, Animated, View,
} from 'react-native';
import IconButton from '../../../components/IconButton';

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
  buttonWrapper: {
    position: 'absolute',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    top: 0,
  },
});

class ButtonsAnimator extends Component {
  constructor(props) {
    super(props);
    // [] Buttons, [] { top, left}, [] { top, left}
    const { buttons, initialPositions, finalPositions } = this.props;

    const animatedInitialPositions = initialPositions.map(x => ({
      top: new Animated.Value(x.top),
      left: new Animated.Value(x.left),
    }));

    this.state = {
      buttons: buttons.map((button, i) => ({
        button,
        actualPosition: animatedInitialPositions[i],
      })),
    };
  }

  componentDidMount() {
    const { buttons } = this.state;
    const { finalPositions, duration, increse } = this.props;
    let newDuration = duration;

    buttons.forEach((x, i) => {
      Animated.timing(buttons[i].actualPosition.top, {
        toValue: finalPositions[i].top,
        duration: newDuration,
      }).start();
      Animated.timing(buttons[i].actualPosition.left, {
        toValue: finalPositions[i].left,
        duration: newDuration,
      }).start();

      newDuration += increse;
    });
  }

  render() {
    const { buttons } = this.state;

    return buttons.map((x, i) => (
      <Animated.View
        // eslint-disable-next-line react/no-array-index-key
        key={i}
        style={[styles.buttonWrapper, { top: x.actualPosition.top, left: x.actualPosition.left }]}
      >
        {x.button}
      </Animated.View>
    ));
  }
}

class MyTshirtsOptions extends Component {
  buttonsIn = [
    <IconButton
      name="edit"
      size={40}
      handler={() => {
        console.log('option!');
      }}
    />,
    <IconButton
      name="eye"
      size={40}
      handler={() => {
        console.log('option!');
      }}
    />,
    <IconButton name="backspace" size={40} handler={() => cancelHandler()} />,
  ];

  initialPositionsIn = [
    { top: height / 2, left: width / 2 },
    { top: height / 2, left: width / 2 },
    { top: height / 2, left: width / 2 },
  ];

  finalPositionsIn = [{ top: 100, left: 40 }, { top: 165, left: 10 }, { top: 230, left: 40 }];

  render() {
    const { cancelHandler } = this.props;
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
