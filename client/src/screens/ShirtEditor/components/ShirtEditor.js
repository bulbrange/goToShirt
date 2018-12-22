import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import prompt from 'react-native-prompt-android';
import Grid from '../../../styles/grid';
import EditorCanvas from './EditorCanvas/EditorCanvas';
import OutputPanel from './OutputPanel/OutputPanel';
import namePrompter from './utilities/save-shirt.protocol';
import saveTexture from './utilities/save-textures.protocol';

const isTextureSelected = textures => textures.some(texture => texture.focus);

class ShirtEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switched: false,
      shirtName: '',
      baseColor: '#CC2222',
      saving: false,
      actualShirt: undefined,
      frontTextures: [],
      backTextures: [],
    };
  }

  handleTextures = async (
    source,
    _,
    posX,
    posY,
    renderSize,
    backgroundColor,
    text = '',
    tintColor,
  ) => {
    const { frontTextures, backTextures, switched } = this.state;
    const id = Date.now();
    const newTexture = {
      source,
      posX,
      posY,
      renderSize,
      id,
      backgroundColor,
      focus: false,
      rotate: '0deg',
      text,
      tintColor,
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

  handleSwitch = async () => {
    const { switched } = this.state;
    await this.setState({
      switched: !switched,
    });
    this.handleTextureFocusLost();
  };

  handleBaseColor = (baseColor, bgColor = true) => {
    const { frontTextures, backTextures } = this.state;
    if (isTextureSelected([...frontTextures, ...backTextures])) {
      [...frontTextures, ...backTextures].map((texture) => {
        if (bgColor && texture.focus) {
          texture.backgroundColor = baseColor;
        } else if (!bgColor && texture.focus) {
          console.log('@handleBaseColor', baseColor);
          texture.tintColor = baseColor;
        } else {
          texture;
        }
        return texture;
      });
      this.setState({
        frontTextures,
        backTextures,
      });
    } else {
      this.setState({
        baseColor,
      });
    }
  };

  handleText = (text, source) => {
    const { frontTextures, backTextures } = this.state;
    if (isTextureSelected([...frontTextures, ...backTextures])) {
      [...frontTextures, ...backTextures].map((texture) => {
        if (texture.focus) {
          texture.text = text;
          texture.source = source;
        }
        return texture;
      });
      this.setState({
        frontTextures,
        backTextures,
      });
    }
  };

  handleShirtName = (text) => {
    this.setState({
      shirtName: text.trim(),
    });
  }

  handleActualShirt = (actualShirt) => {
    this.setState({
      actualShirt,
    });
  }

  handleRotation = (val) => {
    const { frontTextures, backTextures } = this.state;
    [...frontTextures, ...backTextures].map((texture) => {
      if (texture.focus) texture.rotate = `${val}deg`;
      return texture;
    });
    this.setState({
      frontTextures,
      backTextures,
    });
  };

  handleCreateNewShirt = () => {
    const { shirtName, baseColor } = this.state;
    const { addNewShirt } = this.props;
    // Mocking userId --> 1 by the moment as params[0]
    namePrompter(addNewShirt,
      [1, shirtName, baseColor], // <--- params
      this.handleShirtName,
      this.handleActualShirt,
      this.handleSave);
  }

  handleSave = async () => {
    const { frontTextures, backTextures, actualShirt, shirtName } = this.state;
    const { addTexture, cleanShirtTextures, updateShirtName } = this.props;
    if (!actualShirt) this.handleCreateNewShirt();
    else {
      try {
        await cleanShirtTextures(actualShirt.id);
        saveTexture(addTexture, this.state.actualShirt, frontTextures, 'front');
        saveTexture(addTexture, this.state.actualShirt, backTextures, 'back');
        Alert.alert(`T-Shirt: ${actualShirt.name}`, 'All good. State saved!');
        if (shirtName.trim().length) await updateShirtName(actualShirt.id, shirtName);
        else {
          await this.setState({ shirtName: actualShirt.name });
          Alert.alert('Watch out!! You can´t leave a shirt without name.', `Using last name saved('${actualShirt.name}') for now :P`);
        }
      } catch (err) {
        Alert.alert('Something went wrong...', 'Your t-shirt state was not saved.');
      }
    }
  };

  handleTextureFocusLost = async () => {
    const { frontTextures, backTextures } = this.state;
    await [...frontTextures, ...backTextures].map(texture => (texture.focus = false));
    this.setState({
      frontTextures,
      backTextures,
    });
  };
 
  render() {
    const {
      switched, baseColor, frontTextures, backTextures, shirtName, actualShirt
    } = this.state;
    return (
      <View style={[Grid.grid]}>
        <View style={[Grid.row, Grid.p0, { flex: 0.7 }]}>
          <EditorCanvas
            states={{
              switched,
              baseColor,
              frontTextures,
              backTextures,
            }}
            handlers={{
              handleTextureFocusLost: this.handleTextureFocusLost,
              handleSwitch: this.handleSwitch,
            }}
          />
        </View>
        <View style={[Grid.row, Grid.p0, { flex: 0.3, zIndex: 1 }]}>
          <OutputPanel
            states={{
              switched,
              baseColor,
              frontTextures,
              backTextures,
              shirtName,
            }}
            handlers={{
              handleTextures: this.handleTextures,
              handleRotation: this.handleRotation,
              handleBaseColor: this.handleBaseColor,
              handleSwitch: this.handleSwitch,
              handleCarrousel: this.handleCarrousel,
              handleSlider: this.handleSlider,
              handleText: this.handleText,
              handleSave: this.handleSave,
              handleShirtName: this.handleShirtName,
            }}
          />
        </View>
      </View>
    );
  }
}

export default ShirtEditor;
