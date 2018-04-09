import React, { Component } from 'react';
import {
   View,
   Animated,
   PanResponder,
   Dimensions,
   Platform,
   LayoutAnimation,
 } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

class Swipe extends Component {
  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {},
    renderNoMoreCards: () => {},
    keyProp: 'id'
  };
  constructor(props) {
    super(props);
    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        // console.log(Animated.ValueXY.prototype);
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          this.forceSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.forceSwipe('left');
        } else {
          this.resetPostion();
        }
      }
    });
    this.state = { panResponder, position, stateArrayIndex: 0 };
  }

componentWillReceiveProps(nextProps) {
  if (nextProps.data !== this.props.data) {
    this.setState({ stateArrayIndex: 0 });
  }
}
  componentWillUpdate() {
    //These statement are creating problem with LayoutAnimation card gets rotated at its own postion
   // UIManager.setLayoutAnimationEnabledExperimental
   // && UIManager.setLayoutAnimationEnabledExperimental(true);
  LayoutAnimation.spring();
  }

  onSwipeComplete(direction) {
    const { onSwipeRight, onSwipeLeft, data } = this.props;
    const item = data[this.state.stateArrayIndex];
    // console.log('stateArrayIndex', this.state.stateArrayIndex);
    const onSwipeFunction = direction === 'right' ? onSwipeRight : onSwipeLeft;
    onSwipeFunction(item);
    // increasing index so next card can be rendered in AnimatedView
    this.setState({ stateArrayIndex: this.state.stateArrayIndex + 1 });
    //resetting the position for the next card in AnimatedView
    this.state.position.setValue({ x: 0, y: 0 });
  }

getCardStyle() {
  const { position } = this.state;
  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH * 1.8, 0, SCREEN_WIDTH * 1.8],
    outputRange: ['-120deg', '0deg', '120deg']
  });
  return ({
    ...position.getLayout(),
    transform: [{ rotate }]
  });
}

forceSwipe(direction) {
  const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
  Animated.timing(this.state.position, {
    toValue: { x, y: 0 },
    duration: SWIPE_OUT_DURATION
  }).start(() => this.onSwipeComplete(direction));
}

resetPostion() {
Animated.spring(this.state.position, {
  toValue: { x: 0, y: 0 }
}).start();
}

  renderCards() {
    if (this.state.stateArrayIndex >= this.props.data.length) {
      return this.props.renderNoMoreCards();
    }

    const deck = this.props.data.map((item, mapIndex) => {
        if (mapIndex < this.state.stateArrayIndex) {
          return null;
        } else if (mapIndex === this.state.stateArrayIndex) {
          return (
          <Animated.View
          key={item[this.props.keyProp]}
          style={[this.getCardStyle(), styles.cardStyle]}
          {...this.state.panResponder.panHandlers}
          >
          {this.props.renderCard(item)}
          </Animated.View>);
        }
          return (
            <Animated.View
            key={item[this.props.keyProp]}
            style={[styles.cardStyle, { top: 10 * (mapIndex - this.state.stateArrayIndex) }]}
            >
             {this.props.renderCard(item)}
            </Animated.View>
           );
      });
  return deck.reverse();
  }
  render() {
    return (
      <View>
      {this.renderCards()}
      </View>
    );
  }
}

const styles = {
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    // because in android stacking was not proper. the top card was stacked below others ,therefore
    elevation: 0
  }
};

export default Swipe;
