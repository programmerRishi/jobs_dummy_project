import React, { Component } from 'react';
import { View, Text, Platform, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Card } from 'react-native-elements';
import Swipe from '../components/Swipe';

class DeckScreen extends Component {

  componentWillReceiveProps(nextProps) {
   console.log(nextProps);
  }

  renderCard(job) {
    const initialRegion = {
      longitude: job.longitude,
      latitude: job.latitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.02
    };
    const { height } = Dimensions.get('window');
    return (
      <Card title={job.jobtitle} >
        <View style={{ borderWidth: 2, height: (0.4 * height) }}>
        <MapView
        scrollEnabled={false}
        style={{ flex: 1 }}
        loadingEnabled
        cacheEnabled={Platform.OS === 'android'}// this expression results either true or false
        // if true-- gives static image, if false-- gives a live map
        // cacheEnabled={false} creates problems on android device
        initialRegion={initialRegion}
        liteMode
        />
        </View>
        <View style={styles.detailWrapper}>
          <Text>{job.company}</Text>
          <Text>{job.formattedRelativeTime}</Text>
        </View>
        <Text>{job.snippet.replace('<b>', '').replace('<\/b>', '')}</Text>
      </Card>
    );
  }

  renderNoMoreCards() {
      return (
        <Card title='No more Jobs'>
        </Card>
      );
  }

  render() {
    console.log(this.nextProps);
    return (
      <View style={styles.container}>
        <Swipe
          data={this.props.jobs}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          keyProp='jobkey'
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
      flex: 1,
      justifyContent: 'space-around',
      marginBottom: 10
    }

};

const mapStateToProps = ({ jobsReducer }) => {
  const { jobs } = jobsReducer;
  return { jobs };
};

export default connect(mapStateToProps, null)(DeckScreen);
