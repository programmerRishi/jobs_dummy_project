import React from 'react';
import { Provider } from 'react-redux';
import { Alert } from 'react-native';
import { Notifications } from 'expo';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import MainNavigator from './components/Router.js';
import registerForPushNotifications from './services/push_notifications';

export default class App extends React.Component {
  componentDidMount() {
    registerForPushNotifications();
    Notifications.addListener((notification) => {
        const { data: { text }, origin } = notification; // equal to notification.data.text
        if (origin === 'received' && text) {
          Alert.alert(
            'New Push Notification',
            text,
            [
              { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
              { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]
          );
        }
      }
    );
  }
  render() {
    return (
      // we are not enclosing MainNavigator inside view
      //because the tab TabNavigator doesnot show up.
      //  https://www.udemy.com/react-native-advanced/learn/v4/questions/2397324
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <MainNavigator />
        </PersistGate>
      </Provider>
    );
  }
}
