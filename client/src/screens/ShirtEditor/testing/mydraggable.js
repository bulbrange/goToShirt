import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  PanResponder,
  Animated,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    padding: 5,
  },
  onFocus: {
    borderWidth: 4,
    borderColor: 'green',
  },
});

export default class Draggablee extends Component {
  constructor(props) {
    super(props);
    const { posX, posY } = this.props;
    this.state = {
      pan: new Animated.ValueXY({ x: posX, y: posY }),
      scale: new Animated.Value(1),
      valueX: 0,
      valueY: 0,
      newX: 0,
      newY: 0,
    };
  }

  componentWillMount() {
    const { id, source, updatePosition } = this.props;
    const { newX, newY } = this.state;
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: async (e, gestureState) => {
        this.state.pan.setOffset({ x: this.state.pan.x._value, y: this.state.pan.y._value });
        await this.setState({
          newX: this.state.pan.x._value,
          newY: this.state.pan.y._value,
        });
        console.log('gdfgd<<<<<', this.state.newX);
        await updatePosition(
            source,
            Math.floor(this.state.newX),
            Math.floor(this.state.newY),
            id,
        );
        this.state.pan.setValue({ x: 0, y: 0 });


        Animated.spring(this.state.scale, { toValue: 1.1, friction: 3 }).start();
        this.setState({
          valueX: this.state.pan.x._value,
          valueY: this.state.pan.y._value,
        });
      },

      onPanResponderMove: Animated.event([null, { dx: this.state.pan.x, dy: this.state.pan.y }]),

      onPanResponderRelease: async (e, { vx, vy }) => {
        this.state.pan.flattenOffset();
        Animated.spring(this.state.scale, { toValue: 1, friction: 3 }).start();
        this.setState({
          focus: true,
        });


      },
    });
  }

  render() {
    // Destructure the value of pan from the state
    const {
      pan, scale, valueX, valueY, newX, newY,
    } = this.state;
    const { id, source, posX, posY, renderSizeX, renderSizeY, handleSwitch, focus } = this.props;
    // Calculate the x and y transform from the pan value
    const [translateX, translateY] = [pan.x, pan.y];

    const rotate = '0deg';

    // Calculate the transform property and set it as a value for our style which we add below to the Animated.View component
    const imageStyle = { transform: [{ translateX }, { translateY }, { rotate }, { scale }] };
    console.log(this);
    console.log('ORIGIN X: ', valueX);
    console.log('ORIGIN Y: ', valueY);
    console.log('NEW X: ', newX);
    console.log('NEW Y: ', newY);
    console.log("HAS FOCUS: ", focus)
    const focusStyle = focus ? styles.onFocus : undefined;
    return (
      <Animated.View
        style={[
          imageStyle,
          styles.container,
          focusStyle,
          { width: renderSizeX + 18, height: renderSizeY + 18 },
        ]}
        {...this._panResponder.panHandlers}
      >
        <Image
          style={{ width: renderSizeX, height: renderSizeY }}
          source={{ uri: 'https://i.ebayimg.com/images/g/hYEAAOxy7MtRq4sX/s-l300.jpg' }}
        />
      </Animated.View>
    );
  }
}
