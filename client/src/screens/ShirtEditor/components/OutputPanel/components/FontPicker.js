import React, { Component } from 'react';
import {
  View, Picker, StyleSheet, TextInput, ScrollView,
} from 'react-native';
import fs from 'react-native-fs';
import Grid from '../../../../../styles/grid';
import { RawColors } from '../../../../../styles/colors';
import { isTextureSelected } from '../../utilities/load-shirt.protocol';



const posX = 50;
const posY = 80;
const renderSize = 30;

const triggerFunctions = async (f, g) => {
  f();
  await g();
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'left',
    padding: 0,
  },
  picker: {
    height: 30,
    backgroundColor: RawColors.light2,
    padding: 0,
  },
  pickerWrapper: {
    borderColor: RawColors.black,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingTop: 5,
  },
});

class FontPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeFont: undefined,
      fonts: undefined,
      text: '',
    };
  }

  async componentDidMount() {
    const readedFonts = await fs.readDirAssets('fonts');
    const { textures } = this.props;
    const selectedTexture = textures.filter(texture => texture.focus);
    this.setState({
      fonts: readedFonts,
      activeFont:
        selectedTexture[0] && selectedTexture[0].text.length
          ? selectedTexture[0].source
          : readedFonts[0].name.split('.')[0],
    });
  }

  componentWillReceiveProps(nextProps) {
    const actualFocus = nextProps.textures.filter(texture => texture.focus);
    if (actualFocus[0] && actualFocus[0].text.length) {
      this.setState({
        text: actualFocus[0].text,
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const { onTextChange } = this.props;
    const { activeFont } = this.state;
    const actualFocus = nextProps.textures.filter(texture => texture.focus);
    if (actualFocus[0] && actualFocus[0].text.length && activeFont !== nextState.activeFont) {
      onTextChange(actualFocus[0].text, nextState.activeFont);
    }
  }

  render() {
    const { fonts, activeFont, text } = this.state;
    const { handler, textures, onTextChange } = this.props;
    const selectedTexture = textures.filter(texture => texture.focus);

    const fontStore = [
      { font: 'font1', name: 'Asly Brush' },
      { font: 'font2', name: 'Atmospherica Personal Use' },
      { font: 'font3', name: 'Riffle Free' },
      { font: 'font4', name: 'Sugar & Spice' },
      { font: 'font5', name: 'valentine' },
    ];

    return (
      <View style={[Grid.grid]}>
        <ScrollView>
          <View style={[Grid.row, { flex: 0.2 }]}>
            <View style={[Grid.col12, styles.pickerWrapper]}>
              <Picker
                selectedValue={activeFont}
                style={[styles.picker]}
                onValueChange={(itemValue, itemIndex) => this.setState({ activeFont: itemValue })}
              >
                {fonts
                  ? fonts.filter(x => x.name.match(/font/)).map((font, i) => (
                    <Picker.Item
                      key={font.name}
                      label={fontStore[i].name}
                      value={font.name.split('.')[0]}
                    />
                  ))
                  : undefined}
              </Picker>
            </View>
          </View>
          <View style={[Grid.row, { flex: 0.8 }]}>
            <View style={[Grid.col12]}>
              <TextInput
                style={[styles.text, { fontFamily: activeFont }]}
                onChangeText={(text) => {
                  isTextureSelected(textures)
                    ? triggerFunctions(
                      () => onTextChange(text, activeFont),
                      () => this.setState({ text: selectedTexture[0].text }),
                    )
                    : this.setState({ text });
                }}
                placeholder="Type something :)"
                onSubmitEditing={() => {
                  !isTextureSelected(textures) && text.length
                    ? triggerFunctions(
                      () => handler(activeFont, null, posX, posY, renderSize, 'black', text),
                      () => this.setState({ text: '' }),
                    )
                    : null;
                }}
                value={this.state.text}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default FontPicker;
