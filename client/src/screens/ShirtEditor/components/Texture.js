import React, { Component } from 'react';
import Draggable from 'react-native-draggable';

const colisionX = (posX) => {
  if (posX > 170) return 170;
  if (posX < 60) return 60;
  return posX;
};
const colisionY = (posY) => {
  if (posY > 260) return 260;
  if (posY < 70) return 70;
  return posY;
};
const shouldRefresh = (posX, posY) => posX > 170 || posX < 70 || posY > 260 || posY < 70;
class Texture extends Component {
  constructor(props) {
    super(props);
    const { posX, posY } = this.props;
    this.state = {
      originalX: posX,
      originalY: posY,
    };
  }

  render() {
    const { originalX, originalY } = this.state;
    const {
      source, renderSize, updateFrontXY, handleSwitch,
    } = this.props;

    return (
      <Draggable
        ref={(texture) => {
          this.texture = texture;
        }}
        renderShape="image"
        imageSource={source}
        reverse={false}
        renderSize={renderSize}
        x={originalX}
        y={originalY}
        pressDragRelease={async () => {
          const newX = Math.floor(this.texture.state._value.x + originalX);
          const newY = Math.floor(this.texture.state._value.y + originalY);
          await updateFrontXY(source, colisionX(newX), colisionY(newY));
          if (shouldRefresh(newX, newY)) {
            await handleSwitch();
            await handleSwitch();
          }
        }}
      />
    );
  }
}

export default Texture;
