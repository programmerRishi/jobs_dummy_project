import _ from 'lodash';
// import { REHYDRATE } from 'redux-persist/src/constants';
import {
  LIKE_JOB,
  CLEAR_LIKED_JOBS
} from '../actions/types';

const INITIAL_STATE = [];
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case REHYDRATE:
    //   return action.payload.likedJobs || [];
    case CLEAR_LIKED_JOBS:
      return INITIAL_STATE;
    case LIKE_JOB:
      return _.uniqBy(
        [action.payload, ...state],
        'jobkey'
      );
    default:
      return state;
  }
};
