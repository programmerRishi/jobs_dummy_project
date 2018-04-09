import { combineReducers } from 'redux';
import authReducer from './auth_reducer';
import jobsReducer from './jobs_reducer';

export default combineReducers(
  {
    auth: authReducer,
    jobsReducer
  }
);
