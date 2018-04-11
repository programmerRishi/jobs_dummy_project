import { SwitchNavigator, TabNavigator, StackNavigator } from 'react-navigation';
import AuthScreen from '../screens/AuthScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import MapScreen from '../screens/MapScreen';
import DeckScreen from '../screens/DeckScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ReviewScreen from '../screens/ReviewScreen';

const SettingsAndReview = StackNavigator(
  {
    reviewScreen: {
      screen: ReviewScreen
    },
    settings: {
      screen: SettingsScreen
    },
  }
);

const MainScreen = TabNavigator(
  {
    map: {
      screen: MapScreen
    },
    deck: {
      screen: DeckScreen
    },
    review: {
      screen: SettingsAndReview
    }
  },
  {
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    tabBarOptions: {
      showIcon: true,
      showLabel: true,
      labelStyle: { fontSize: 14 }
    },
  }
);

const MainNavigator = SwitchNavigator(
  {
    Auth: {
      screen: AuthScreen
    },
    Welcome: {
      screen: WelcomeScreen
    },
    main: {
      screen: MainScreen
    }
  },
  {
    initialRouteName: 'Welcome',
  }
);

export default MainNavigator;
