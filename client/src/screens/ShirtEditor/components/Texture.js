import React, { Component } from 'react';
import Draggable from 'react-native-draggable';

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
    const { source, updateFrontXY } = this.props;
    return (
      <Draggable
        ref={(texture) => {
          this.texture = texture;
        }}
        renderShape="image"
        imageSource={source}
        reverse={false}
        renderSize={100}
        offsetX={0}
        offsetY={0}
        x={originalX}
        y={originalY}
        pressDragRelease={() => {
          updateFrontXY(
            source,
            Math.floor(this.texture.state._value.x + originalX),
            Math.floor(this.texture.state._value.y + originalY),
          );
        }}
      />
    );
  }
}

export default Texture;
