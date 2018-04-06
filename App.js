import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import MainNavigator from './components/Router.js';

export default class App extends React.Component {
  render() {
    return (
      // we are not enclosing MainNavigator inside view
      //because the tab TabNavigator doesnot show up.
      //  https://www.udemy.com/react-native-advanced/learn/v4/questions/2397324
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}
