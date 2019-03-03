import React, { Component } from 'react';
import R from 'ramda';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Sound from 'react-native-sound';
import Grid from '../../../styles/grid';
import FormSelect from '../../../components/FormSelect';
import MyTshirtsOptions from './MyTshirtsOptions';
import { Colors, RawColors } from '../../../styles/colors';
import Carrousel from '../../../components/Carrousel';
import IP from '../../../ip';
import { store } from '../../../App';
// This data will be from DB user->groups

const styles = StyleSheet.create({
  changeSide: {
    position: 'absolute',
    right: 15,
    top: 0,
    zIndex: 51,
    padding: 15,
  },
});

class Mytshirts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 'own',
      currentImageSelected: null,
      name: 'Select a T-shirt',
      selected: null,
      isFront: true,
      options: false,
      items: [{ label: 'FILTER BY OWN', value: 'own' }],
      selectedTshirts: null,
    };
    this.sound = new Sound('button.mp3', Sound.MAIN_BUNDLE, (error) => { });
  }

  componentDidMount() {
    const { userById } = this.props;
    const { items } = this.state;
    console.log('BY ID', userById);
    const finalItems = userById.groups && userById.groups.map(group => ({
      label: `FILTER BY ${group.name.toUpperCase()} GROUP`,
      value: group.id,
    }));
    const tshirts = userById &&  userById.tshirts && this.antiCache(userById.tshirts);

    this.setState({
      items: [...items, ...finalItems],
      selectedTshirts: this.antiCache(userById.tshirts),
    });
  }

  componentWillReceiveProps(nextProps) {
    const { selected, filter, items } = this.state;
    const groups = nextProps.userById && nextProps.userById.groups;
    if (groups && groups.length >= items.length) {
      this.setState({
        items: [...items,
          { label: `FILTER BY ${groups[0].name.toUpperCase()} GROUP`, value: groups[0].id },
        ],
      });
    }

    if (filter === 'own') {
      const updatedSelectedTshirts = nextProps.userById && nextProps.userById.tshirts;
      this.setState({
        selectedTshirts: (updatedSelectedTshirts && this.antiCache(updatedSelectedTshirts)) || [],
      });
    } else {
      const updatedSelectedTshirts = nextProps.userById && nextProps.userById.groups
        ? nextProps.userById.groups
          .filter(group => group.id === filter)[0]
          .tshirts.edges.map(edge => edge.node)
        : [];
      this.setState({
        selectedTshirts: this.antiCache(updatedSelectedTshirts) || [],
      });
    }

    if (selected) {
      if (filter === 'own') {
        const updatedTshirt = nextProps.userById && nextProps.userById.tshirts
          ? nextProps.userById.tshirts.filter(tshirt => tshirt.id === selected.id)[0]
          : null;
        this.setState({
          name: updatedTshirt && updatedTshirt.name ? updatedTshirt.name : 'Select a T-shirt',
          selected: updatedTshirt || null,
        });
      } else {
        const updatedTshirt = nextProps.userById && nextProps.userById.groups
          ? nextProps.userById.groups
            .filter(group => group.id === filter)[0]
            .tshirts.edges.map(edge => edge.node)
            .filter(tshirt => tshirt.id === selected.id)[0]
          : null;
        this.setState({
          name: updatedTshirt && updatedTshirt.name ? updatedTshirt.name : 'Select a T-shirt',
          selected: updatedTshirt || null,
        });
      }
    }
  }


  antiCache = tshirts => tshirts.map((tshirt) => {
    tshirt.source = `http://${IP}:3333/front_${tshirt.id}.png?s=${Math.floor(
      Math.random() * 100000,
    )}`;
    tshirt.sourceBack = `http://${IP}:3333/back_${tshirt.id}.png?s=${Math.floor(
      Math.random() * 100000,
    )}`;
    return tshirt;
  });

  selectHandler = async (itemValue, itemIndex) => {
    const { userById } = this.props;

    const selectedTshirts = itemValue === 'own'
      ? await userById.tshirts
      : await userById.groups
        .filter(group => group.id === itemValue)[0]
        .tshirts.edges.map(edge => edge.node);

    await this.setState({
      filter: itemValue,
      selectedTshirts,
      selected: null,
      currentImageSelected: null,
      options: false,
      name: 'Select a T-shirt',
    });
  };

  onChangeSide = () => {
    const { selected, isFront } = this.state;
    if (selected === null) return;

    this.setState({
      currentImageSelected: isFront ? selected.sourceBack : selected.source,
      isFront: !isFront,
    });
  };

  onImagePress = () => {
    const { selected } = this.state;
    if (selected === null) return;
    this.setState({
      options: true,
    });
  };

  onImageSelected = (source, id) => {
    const { selectedTshirts } = this.state;
    const selected = selectedTshirts.filter(x => x.id === id)[0];

    this.setState({
      currentImageSelected: source,
      selected,
      isFront: true,
      name: selected.name,
      options: false,
    });

    this.sound.stop();

    setTimeout(() => {
      Sound.setCategory('Playback', true);
      this.sound.play();
    }, 1);
  };

  onCancelPress = () => {
    this.setState({
      options: false,
    });
  };

  onRemoveShirt = async (shirt) => {
    const { removeShirt } = this.props;
    const endpoint = `http://${IP}:8080/delete/${shirt.id}`;

    Alert.alert(
      'Remove Tshirt',
      'Your are going to delete a thisrt, are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            await removeShirt(shirt.id).then(async () => {
              Alert.alert('Work done!!', `Say bye bye to your '${shirt.name}' tshirt`);
              await this.setState({
                currentImageSelected: null,
                name: 'Select a T-shirt',
                selected: null,
                isFront: true,
                options: false,
              });
            });
            await fetch(endpoint).catch(err => console.log(err));
          },
        },
      ],
      { cancelable: false },
    );
  };

  onEndReach = async (inf, flatList) => {
    const { loadMoreEntries } = this.props;
    const { filter } = this.state;
    if (filter !== 'own') loadMoreEntries(filter);
  };

  onSharePress = () => {
    const { navigation, userById } = this.props;
    const { selected } = this.state;
    if (!selected || !userById) return;
    navigation.navigate('Share', {
      tshirt: selected,
      groups: userById.groups,
    });
  };

  render() {
    const {
      navigation: { navigate },
      auth,
    } = this.props;

    const {
      filter,
      currentImageSelected,
      name,
      options,
      selected,
      items,
      selectedTshirts,
    } = this.state;

    // Allow share/delete if owner
    const userId = auth.id;
    const share = (selected && selected.userId === userId) || false;

    if (!selectedTshirts) return <ActivityIndicator size="large" color="#0000ff" />;
    return (
      <View style={[Grid.grid, RawColors.light]}>
        <View style={[Grid.row, Grid.container, { flex: 0.1 }]}>
          <View style={[Grid.col12, Grid.justifyCenter]}>
            <FormSelect selectedValue={filter} handler={this.selectHandler} items={items} />
          </View>
        </View>
        <View
          style={[
            Grid.row,
            Colors.border,
            Grid.justifyCenter,
            Colors.white,
            {
              flex: 0.05,
              alignItems: 'center',
            },
          ]}
        >
          <Text style={{ fontWeight: 'bold', color: RawColors.dark, fontSize: 20 }}>{name}</Text>
        </View>
        <View style={[Grid.row, Grid.container, { flex: 0.55 }]}>
          {options ? (
            <MyTshirtsOptions
              cancelHandler={this.onCancelPress}
              shirt={selected}
              navigate={navigate}
              onRemoveShirt={this.onRemoveShirt}
              onChangeSide={this.onChangeSide}
              onSharePress={this.onSharePress}
              shareDelete={share}
            />
          ) : null}
          <TouchableOpacity
            onPress={this.onImagePress}
            activeOpacity={1}
            style={[Grid.col12, Colors.white]}
          >
            <Image
              resizeMode="contain"
              style={{
                flex: 1,
                width: null,
                height: null,
              }}
              source={{ uri: currentImageSelected }}
            />
          </TouchableOpacity>
        </View>
        <View style={[Grid.row, Grid.alignMiddle, Grid.container, { flex: 0.3 }]}>
          <Carrousel
            images={selectedTshirts}
            handler={this.onImageSelected}
            handlerEndReach={this.onEndReach}
            animated={false}
            args={[]}
          />
        </View>
      </View>
    );
  }
}
export default Mytshirts;
