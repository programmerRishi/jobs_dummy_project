import { SwitchNavigator, TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation';
import AuthScreen from '../screens/AuthScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import MapScreen from '../screens/MapScreen';
import DeckScreen from '../screens/DeckScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ReviewScreen from '../screens/ReviewScreen';
import { tabNavigationOptions } from './tabNavigatorNavigationOptions';
import { stackNavigationOptions } from './stackNavigatorNavigationOptions';

const drawerNavigator = DrawerNavigator(
  {
    reviewScreen: {
      screen: ReviewScreen
    },
    Settings: {
      screen: SettingsScreen
    }
  }
);

const Review = StackNavigator(
  {
    drawer: {
      screen: drawerNavigator,
      navigationOptions: stackNavigationOptions
    }
  },
  {
    headerMode: 'float'
  }
);

const MainScreen = TabNavigator(
  {
    map: {
      screen: MapScreen,
      navigationOptions: tabNavigationOptions
    },
    deck: {
      screen: DeckScreen,
      navigationOptions: tabNavigationOptions
    },
    review: {
      screen: Review,
      navigationOptions: tabNavigationOptions
    }
  },
  {
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: true,
    tabBarOptions: {
      // indicatorStyle is a style object for a <View /> Component
      // indicatorStyle is style for the line at the bottom of tab
        indicatorStyle: {
          backgroundColor: '#fff'
        },
        showIcon: true,
        upperCaseLabel: false,
        showLabel: true,
        labelStyle: { fontSize: 12 }
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
    },
  },
  {
    initialRouteName: 'Welcome',
  }
);

export default MainNavigator;
