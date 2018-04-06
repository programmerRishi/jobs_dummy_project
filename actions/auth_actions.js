import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import {
  FB_LOGIN_SUCCESS,
  FB_LOGIN_FAILURE
} from './types';

//down below I have used the ES-7 syntax to shorten the code
export const facebookLogin = () => async dispatch => {
  const token = await AsyncStorage.getItem('fb_token');
  if (token) {
    dispatch({ type: FB_LOGIN_SUCCESS, payload: token });
  } else {
    // Start the process of FB login
    dofacebookLogin(dispatch);
  }
};

const dofacebookLogin = async dispatch => {
  const { type, token } = await Facebook.logInWithReadPermissionsAsync('828163857382476', {
    permissions: ['public_profile']
  });
  if (type === 'cancel') {
    dispatch({ type: FB_LOGIN_FAILURE });
  } else {
    await AsyncStorage.setItem('fb_token', token);
    dispatch({ type: FB_LOGIN_SUCCESS, payload: token });
  }
};
