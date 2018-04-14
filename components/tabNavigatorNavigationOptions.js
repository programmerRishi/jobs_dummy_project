import React from 'react';
import { Icon } from 'react-native-elements';

const iconName = { map: 'my-location', deck: 'description', review: 'favorite' };
const tabBarLabel = { map: 'Map', deck: 'Jobs', review: 'Review Jobs' };

const tabNavigationOptions = ({ navigation }) => {
  const routeName = navigation.state.routeName;
    return (
      {
          tabBarLabel: tabBarLabel[routeName],
          tabBarIcon: ({ tintColor }) => {
            return <Icon name={iconName[routeName]} size={30} color={tintColor} />;
          },
      }
    );
};

export { tabNavigationOptions };
