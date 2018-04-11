import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { clearlikedJobs } from '../actions';

class SettingsScreen extends Component {
  static navigationOptions = () => (
    {
      title: 'Settings',
      headerTitleStyle: {
          textAlign: 'center',
          flex: 1
      },
      headerStyle: {
          marginTop: Platform.OS === 'android' ? 15 : 0
      },
      headerRight: <View />
    }
  );

  render() {
    return (
      <View style={styles.container}>
        <Button
        title='Clear all Liked Jobs'
        large
        backgroundColor='#CF000F'
        containerViewStyleProp={{ borderRadius: 4 }}
        icon={{ name: 'delete-forever' }}
        onPress={this.props.clearlikedJobs}
        />
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
export default connect(null, { clearlikedJobs })(SettingsScreen);
