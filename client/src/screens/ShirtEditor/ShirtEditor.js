import React, { Component } from 'react';
import { View, Animated, Easing } from 'react-native';
import Grid from '../../styles/grid';
import EditorCanvas from './components/EditorCanvas';
import OptionPanel from './components/OptionPanel';
import OutputPanel from './components/OutputPanel';
import Loader from '../../components/Loader';
import { client } from '../../App';
import { GET_TSHIRT, GET_TEXTURES } from '../../queries/tshirt.queries';

const optionPanelOffsetBottom = -550;
const optionPanelMarginBottom = 20;
const animationDelay = 500;
const isTextureSelected = (frontTextures, backTextures) => frontTextures.some(texture => texture.focus) || backTextures.some(texture => texture.focus);
class ShirtEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOptionPanel: false,
      switched: false,
      shirtBaseColor: '#A0A0A0',
      colorPicker: false,
      imageSlider: true,
      saved: false,
      frontTextures: [],
      backTextures: [],
      yValue: new Animated.Value(optionPanelOffsetBottom),
      newTshirt: 2,
    };
  }

  async componentDidMount() {
    const { newTshirt } = this.state;
    if (newTshirt > 0) {
      console.log('EDITING TSHIRT');
      await client
        .query({
          query: GET_TSHIRT,
          variables: { id: newTshirt },
        })
        .then(res => console.log(res.data.tshirt))
        .catch(err => console.log(err.message, newTshirt));

      const texturesRecovered = await client
        .query({
          query: GET_TEXTURES,
          variables: { tshirtId: newTshirt },
        })
        .then(res => res.data.tshirtTextures))
        .catch(err => console.log(err.message, newTshirt));
      this.setState({
        frontTextures: texturesRecovered.filter(x => x.face === 'front'),
      });
      console.log(this.state.frontTextures);
    } else {
      console.log('IN A NEW TSHIRT!!!');
    }
  }

  handleTextureFocusLost = async () => {
    const { frontTextures, backTextures } = this.state;
    await [...frontTextures, ...backTextures].map(texture => (texture.focus = false));
    this.setState({
      frontTextures,
      backTextures,
    });
  };

  handleSwitch = async () => {
    const { switched } = this.state;
    await this.setState({
      switched: !switched,
    });
    this.handleTextureFocusLost();
  };

  handleBaseColor = (shirtBaseColor) => {
    const { frontTextures, backTextures } = this.state;
    if (isTextureSelected(frontTextures, backTextures)) {
      [...frontTextures, ...backTextures].map(
        texture => (texture.focus ? (texture.backgroundColor = shirtBaseColor) : texture),
      );
      this.setState({
        frontTextures,
        backTextures,
      });
    } else {
      this.setState({
        shirtBaseColor,
      });
    }
  };

  handleColorPicker = () => {
    const { colorPicker } = this.state;
    this.setState({
      colorPicker: !colorPicker,
      imageSlider: false,
    });
  };

  handleImageSlider = () => {
    const { imageSlider } = this.state;
    this.setState({
      imageSlider: !imageSlider,
      colorPicker: false,
    });
  };

  handlerSave = async () => {
    const { saved } = this.state;
    await this.setState({
      saved: !saved,
    });

    setTimeout(() => {
      console.log(this.state.saved);
      this.setState({
        saved: !this.state.saved,
      });
    }, 2000);
  };

  handleTextures = async (source, id, posX, posY, renderSize, backgroundColor) => {
    const { frontTextures, backTextures, switched } = this.state;
    console.log(backgroundColor);
    const newTexture = {
      source,
      posX,
      posY,
      renderSize,
      id,
      backgroundColor,
      focus: false,
    };
    if (!switched) {
      await this.setState({
        frontTextures: [...frontTextures, newTexture],
      });
    } else {
      await this.setState({
        backTextures: [...backTextures, newTexture],
      });
    }
  };

  updatePosition = (source, posX, posY, id) => {
    const { frontTextures, backTextures, switched } = this.state;
    const textures = switched ? backTextures : frontTextures;
    textures.map((texture) => {
      if (texture.id === id) {
        texture.posX = posX;
        texture.posY = posY;
        texture.focus = true;
      } else {
        texture.focus = false;
      }
      return texture;
    });
    if (switched) {
      this.setState({
        backTextures: textures,
      });
      return;
    }
    this.setState({
      frontTextures: textures,
    });
  };

  handlerMock = () => console.log('Button Working');

  moveAnimation = () => {
    const { yValue, isOptionPanel } = this.state;
    const newTo = isOptionPanel ? optionPanelOffsetBottom : optionPanelMarginBottom;
    Animated.timing(yValue, {
      toValue: newTo,
      duration: animationDelay,
      asing: Easing.ease,
    }).start();
    this.setState({
      isOptionPanel: !isOptionPanel,
    });
  };

  render() {
    const {
      switched,
      shirtBaseColor,
      isOptionPanel,
      colorPicker,
      imageSlider,
      frontTextures,
      backTextures,
      saved,
      yValue,
    } = this.state;

    return (
      <View style={[Grid.grid]}>
        <View style={[Grid.row, Grid.p0, { flex: 0.7 }]}>
          <EditorCanvas
            switched={switched}
            baseColor={shirtBaseColor}
            handleOptionPanel={this.moveAnimation}
            isOptionPanel={isOptionPanel}
            frontTextures={frontTextures}
            updatePosition={this.updatePosition}
            backTextures={backTextures}
            handleSwitch={this.handleSwitch}
            handleTextureFocusLost={this.handleTextureFocusLost}
          />
          <OptionPanel
            animationValues={{ y: yValue }}
            names={['exchange-alt', 'palette', 'film', 'align-center', 'undo', 'tshirt', 'save']}
            handlers={[
              this.handleSwitch,
              this.handleColorPicker,
              this.handleImageSlider,
              this.handlerMock,
              this.handlerMock,
              this.handlerMock,
              this.handlerSave,
            ]}
            position={{ posX: 5, posY: 0 }}
          />
        </View>
        <View style={[Grid.row, Grid.p0, { flex: 0.3 }]}>
          <OutputPanel
            colorPicker={colorPicker}
            imageSlider={imageSlider}
            handleBaseColor={this.handleBaseColor}
            handleTextures={this.handleTextures}
          />
        </View>
        {saved ? <Loader loading={saved} /> : null}
      </View>
    );
  }
}

export default ShirtEditor;
