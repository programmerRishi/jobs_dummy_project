import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AuthScreen extends Component {
  componentDidMount() {
    this.props.facebookLogin();
    // this.onAuthComplete(this.props); padhke dekho ye samajh nahi aaya tha
  }

  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps);
  }

  onAuthComplete(props) {
    if (props.token) {
      props.navigation.navigate('main');
    }
  }

  render() {
    return (
      <View style={styles.container} />
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
const mapStateToProps = ({ auth }) => {
  return { token: auth.token };
};

export default connect(mapStateToProps, actions)(AuthScreen);
