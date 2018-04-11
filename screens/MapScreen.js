import React, { Component } from 'react';
import { View } from 'react-native';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import { Button, Icon } from 'react-native-elements';
import { CustomModal } from '../components/common';
import * as actions from '../actions';

class MapScreen extends Component {
  static navigationOptions = () => (
    {
      tabBarLabel: 'Map',
      tabBarIcon: ({ tintColor }) => {
        return <Icon name='my-location' size={30} color={tintColor} />;
      }
    }
  );
  state = {
    showModal: false,
    region: {
      longitude: -122,
      latitude: 37,
      longitudeDelta: 0.04,
      latitudeDelta: 0.09
    }
  }

  onButtonPress = () => {
    //this.setState is asynchronous
    this.props.fetchJobs(this.state.region, () => {
      this.props.navigation.navigate('deck');
    });
  }
  // arrow function as a callback donot need a '.bind(this)'
  onRegionChangeComplete = (region) => {
    this.setState({ region });
  }

  loadingDataModal = () => {
    if (this.props.loading) {
      return (
        <CustomModal
          modalMessage='Loading Jobs'
          showModal={this.props.loading}
          modalMessageColor='#009688'
          spinnerColor='#009688'
        />
      );
    }
  };

  render() {
    return (
      <View style={{ flex: 1, marginTop: 15 }}>
        {this.loadingDataModal()}
        <MapView
         style={{ flex: 1 }}
         region={this.state.region}
         loadingEnabled
         onRegionChangeComplete={this.onRegionChangeComplete}
        />
        <View style={styles.buttonContainer}>
          <Button
           onPress={this.onButtonPress}
           large
           title='Search this area'
           backgroundColor='#009688'
           icon={{ name: 'search' }}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0
  }
};

const mapStateToProps = ({ jobsReducer }) => {
  const { jobs, loading } = jobsReducer;
    console.log(loading);
  return { jobs, loading };
};

export default connect(mapStateToProps, actions)(MapScreen);
