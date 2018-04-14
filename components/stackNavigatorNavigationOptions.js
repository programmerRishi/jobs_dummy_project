import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';

const iconName = { drawer: 'menu' };
const title = { drawer: 'Menu' };

const stackNavigationOptions = ({ navigation }) => {
  const routeName = navigation.state.routeName;
    return (
      {
          title: title[routeName],
          headerLeft: (
            <Icon
            name={iconName[routeName]}
            size={30}
            onPress={() => navigation.navigate('DrawerOpen')} 
            />
          ),
          headerRight: <View />
      }
    );
};

export { stackNavigationOptions };
