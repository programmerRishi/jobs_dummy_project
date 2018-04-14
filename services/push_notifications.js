import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens';

export default async() => {
      const previousToken = await AsyncStorage.getItem('pushtoken');

      if (previousToken) return;

      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

      if (status !== 'granted') return;

      try {
        const token = await Notifications.getExpoPushTokenAsync();
        await axios.post(PUSH_ENDPOINT, { token: { token } });
        await AsyncStorage.setItem('pushtoken', token);
      } catch (e) {
        console.log(e);
        }
};
