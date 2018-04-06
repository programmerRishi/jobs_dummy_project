import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { Button } from 'react-native-elements';

class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => (
    {
    title: 'Review Jobs',
    headerTitleStyle: (
      {
        paddingBottom: 4,
        textAlign: 'center',
        flex: 1
      }
    ),
    headerStyle: (
      {
        marginTop: Platform.OS === 'android' ? 15 : 0
      }
    ),
    headerRight: (
      <Button
      title='Settings'
      onPress={() => navigation.navigate('settings')}
      backgroundColor='rgba(0,0,0,0)'
      color='rgba(0,122,255,1)'
      />
    ),
    headerLeft: <View />,
  }
);

  render() {
    return (
      <View style={styles.container}>
        <Text>
          I am ReviewScreen
        </Text>
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
export default ReviewScreen;
