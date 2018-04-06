import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import _ from 'lodash';
import { AppLoading } from 'expo';
import Slides from '../components/Slides';

const SLIDES_DATA = [
  { text: 'Welcome to Job Finder', color: '#03A9F4' },
  { text: 'Set your location, then swipe away', color: '#009688' }
];

class WelcomeScreen extends Component {
  state = { token: null };

  async componentWillMount() {
    // await AsyncStorage.removeItem('fb_token');
    const token = await AsyncStorage.getItem('fb_token');
    if (token) {
      this.props.navigation.navigate('main');
    } else {
      this.setState({ token: false });
    }
  }

  onSlidesComplete() {
    this.props.navigation.navigate('Auth');
  }

  render() {
    if (_.isNull(this.state.token)) {
      return <AppLoading />;
    }
    return (
      <View style={styles.container}>
        <Slides data={SLIDES_DATA} onSlidesComplete={this.onSlidesComplete.bind(this)} />
      </View>
          );
        }
      }
const styles = {
        container: {
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
        },
      };
export default WelcomeScreen;
