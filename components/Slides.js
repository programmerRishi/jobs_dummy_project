import React, { Component } from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
  // the 'this' keyword is different for different scope
  // class's 'this' is passed to render() function
  // each scope or function has its own 'this'
  keyExtractor = (item) => item.text;

  renderLastSlide(index) {
    const { data } = this.props;
    if (index === data.length - 1) {
      return (
        <Button
        title='Onwards'
        raised
        color='#000'
        backgroundColor='#fff'
        buttonStyle={styles.buttonStyle}
        onPress={this.props.onSlidesComplete}
        />
      );
    }
  }

  renderSlides({ item, index }) {
    return (

          <View style={[styles.slideViewStyle, { backgroundColor: item.color }]}>
            <Text style={styles.slideTextStyle}>{item.text}</Text>
            {this.renderLastSlide(index)}
          </View>
          );
  }

  render() {
    return (
              <FlatList
              horizontal
              pagingEnabled
              data={this.props.data}
              /*
              // renderItem method receives an object  eg.{item: {…}, index: 0, separators: {…}}
              on each iteration through the data array
              bind(this) is used to send 'this' of class to renderSlides function
              */
              renderItem={this.renderSlides.bind(this)}
              /*
              keyExtractor receives first argument of item object and
              second argument of index from the objec passed  as argument in renderItem
              eg.{item: {…}, index: 0, separators: {…}}
              */
              keyExtractor={this.keyExtractor}
              />
            );
  }
}

const styles = {
        slideViewStyle: {
          width: SCREEN_WIDTH,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 2
        },
        slideTextStyle: {
          fontSize: 30,
          color: '#fff'
        },
        buttonStyle: {
          marginTop: 10,
          // borderRadius: 2
        }
      };
export default Slides;
