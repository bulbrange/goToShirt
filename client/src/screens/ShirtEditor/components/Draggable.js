import React, { Component } from 'react';
import {
  StyleSheet, Image, PanResponder, Animated, View,
} from 'react-native';
import { collisionX, collisionY, shouldRefresh } from '../utilities/collisionLogic';
import IconButton from '../../../components/IconButton';
import Grid from '../../../styles/grid';
import Colors from '../../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    padding: 5,
    zIndex: 3,
  },
  onFocus: {
    borderWidth: 2,
    borderColor: 'green',
  },
});

export default class Draggable extends Component {
  constructor(props) {
    super(props);
    const { posX, posY } = this.props;
    this.state = {
      pan: new Animated.ValueXY({ x: posX, y: posY }),
      scale: new Animated.Value(1),
      valueX: 0,
      valueY: 0,
    };
  }

  componentWillMount() {
    const {
      id, source, updatePosition, handleSwitch, renderSizeX, renderSizeY,
    } = this.props;
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: async (e, gestureState) => {
        this.state.pan.setOffset({ x: this.state.pan.x._value, y: this.state.pan.y._value });
        this.state.pan.setValue({ x: 0, y: 0 });

        Animated.spring(this.state.scale, { toValue: 1, friction: 3 }).start();
        this.setState({
          valueX: this.state.pan.x._value,
          valueY: this.state.pan.y._value,
        });
      },

      onPanResponderMove: Animated.event([null, { dx: this.state.pan.x, dy: this.state.pan.y }]),

      onPanResponderRelease: async (e, { vx, vy }) => {
        this.state.pan.flattenOffset();
        Animated.spring(this.state.scale, { toValue: 1, friction: 3 }).start();

        const newX = Math.floor(this.state.pan.x._value);
        const newY = Math.floor(this.state.pan.y._value);
        await updatePosition(
          source,
          collisionX(newX, renderSizeX),
          collisionY(newY, renderSizeY),
          id,
        );
        if (shouldRefresh(newX, newY, renderSizeX)) {
          await handleSwitch();
          await handleSwitch();
        }
      },
    });
  }

  render() {
    // Destructure the value of pan from the state
    const { pan, scale } = this.state;
    const {
      id, source, renderSizeX, renderSizeY, focus,
    } = this.props;
    // Calculate the x and y transform from the pan value
    const [translateX, translateY] = [pan.x, pan.y];

    const rotate = '0deg';

    // Calculate the transform property and set it as a value for our style which we add below to the Animated.View component
    const imageStyle = { transform: [{ translateX }, { translateY }, { rotate }, { scale }] };

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
        {focus ? <TextureOptions textureId={id} /> : null}
        <Image style={{ width: renderSizeX, height: renderSizeY }} source={source} />
      </Animated.View>
    );
  }
}
// sort-up sort-down sync-alt
const TextureOptions = ({ textureId }) => {
  console.log('TEXTUREID: ', textureId);
  return (
    <View
      style={{
        position: 'absolute',
        borderWidth: 1,
        borderColor: 'black',
        width: 150,
        top: -80, //-50
        left: -40, // -10
        zIndex: 4,
      }}
    >
      <View style={[Grid.grid, { zIndex: 5 }]}>
        <View style={[Grid.row, { zIndex: 6 }]}>
          <IconButton
            name="arrow-alt-circle-up"
            size={40}
            handler={() => console.log('BUTTON WORKING1')}
            styles={{
              zIndex: 7,
              borderRadius: 50,
              backgroundColor: 'green',
              padding: 10,
            }}
          />
          <IconButton
            name="arrow-alt-circle-down"
            size={40}
            handler={() => console.log('BUTTON WORKING2')}
            styles={{
              zIndex: 7,
              borderRadius: 50,
              backgroundColor: 'red',
              padding: 10,
            }}
          />
        </View>
      </View>
    </View>
  );
};
