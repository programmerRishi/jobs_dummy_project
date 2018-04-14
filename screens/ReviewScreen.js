import React, { Component } from 'react';
import {
   View,
   Text,
   Platform,
   FlatList,
   Dimensions,
    Linking
 } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';

class ReviewScreen extends Component {
  static navigationOptions = () => (
    {
        title: 'Review Jobs',
        headerTitleStyle: (
          {
            paddingBottom: 4,
            textAlign: 'center',
            flex: 1,
          }
        ),
        headerStyle: (
          {
            marginTop: Platform.OS === 'android' ? 15 : 0
          }
        ),
        headerRight: <View />,
        headerLeft: <View />,
    }
);

  keyExtractor = (job) => job.jobkey;

  renderLikedJobs = ({ item }) => {
    const { company, formattedRelativeTime, url, latitude, longitude, jobtitle } = item;
    const initialRegion = {
      latitude,
      longitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.02
    };

    const { height } = Dimensions.get('window');
    return (
      <Card title={jobtitle}>
        <View style={{ height: (0.3 * height), marginBottom: 10 }}>
              <MapView
              scrollEnabled={false}
              style={{ flex: 1 }}
              loadingEnabled
              cacheEnabled={Platform.OS === 'android'}
              // this expression above results either true or false
              // if true-- gives static image, if false-- gives a live map
              // cacheEnabled={false} creates problems on android device
              initialRegion={initialRegion}
              liteMode
              />
        </View>
        <View style={styles.detailWrapper}>
             <View>
                  <Text style={styles.italics}>Company: {company}</Text>
                  <Text style={styles.italics}>Posted: {formattedRelativeTime}</Text>
              </View>
              <Button
              title='Apply'
              backgroundColor='#00aced'
              borderRadius={4}
              containerViewStyleProp={{ borderRadius: 4 }}
              onPress={() => Linking.openURL(url)}//
              />
        </View>
      </Card>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
        data={this.props.likedJobs}
        renderItem={this.renderLikedJobs}
        keyExtractor={this.keyExtractor}
        />
      </View>
          );
  }
}

const styles = {
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    detailWrapper: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'space-between',
      marginBottom: 10
    },
    italics: {
      fontStyle: 'italic'
    }
};

const mapStateToProps = ({ likedJobs }) => {
  return { likedJobs };
};

export default connect(mapStateToProps)(ReviewScreen);
