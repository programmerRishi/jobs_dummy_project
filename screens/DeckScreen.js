  import React, { Component } from 'react';
import { View, Text, Platform, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Card, Button, Icon } from 'react-native-elements';
import * as actions from '../actions';
import Swipe from '../components/Swipe';

class DeckScreen extends Component {

  renderCard = (job) => {
    const initialRegion = {
      longitude: job.longitude,
      latitude: job.latitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.02
    };

    const { height } = Dimensions.get('window');
    return (
      <Card title={job.jobtitle} >
        <View style={{ height: (0.4 * height), marginBottom: 10 }}>
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
        <View style={{ height: 70 }}>
            <Text>{job.snippet.replace(/[<b>]/g, '').replace(/[<\/b>]/g, '')}</Text>
        </View>
      </Card>
    );
  }

  renderNoMoreCards = () => {
      return (
        <Card title='No more Jobs'>
          <Button
            title='Back to Map'
            large
            icon={{ name: 'my-location' }}
            backgroundColor='#00aced'
            onPress={() => this.props.navigation.navigate('map')}
          />
        </Card>
      );
  }

  render() {
    return (
      <View style={styles.container}>
        <Swipe
          data={this.props.jobs}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          onSwipeRight={job => this.props.likeJob(job)}
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
      marginTop: 10
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

export default connect(mapStateToProps, actions)(DeckScreen);
