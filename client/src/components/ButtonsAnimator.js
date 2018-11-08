import React, { Component } from 'react';
import { Animated, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
    const { buttons, initialPositions } = this.props;

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

export default ButtonsAnimator;
