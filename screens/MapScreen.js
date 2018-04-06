import React, { Component } from 'react';
import { View } from 'react-native';
import { MapView } from 'expo';

class MapScreen extends Component {
  state = {
    region: {
      longitude: -122,
      latitude: 37,
      longitudeDelta: 0.04,
      latitudeDelta: 0.09
    }
  }
  // arrow function as a callback donot need a '.bind(this)'
  onRegionChangeComplete = (region) => {
    console.log(region);
    this.setState({ region });
  }

  render() {
    return (
      <View style={{ flex: 1, marginTop: 15 }}>
        <MapView
         style={{ flex: 1 }}
         region={this.state.region}
         onRegionChangeComplete={this.onRegionChangeComplete}
        />
      </View>
          );
        }
      }

export default MapScreen;
