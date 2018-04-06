import React, { Component } from 'react';
import { View, Text } from 'react-native';

class DeckScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          I am DeckScreen
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
export default DeckScreen;
