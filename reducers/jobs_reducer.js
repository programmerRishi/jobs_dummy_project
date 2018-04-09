import {
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_FAILED,
  FETCHING_JOBS
} from '../actions/types';

const INITIAL_STATE = { jobs: [], loading: false };

const pushData = (state, results) => {
  for (let i = 0; i < results.length; i++) {
    state.jobs.push(results[i]);
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHING_JOBS:
      return { ...state, loading: true };
    case FETCH_JOBS_FAILED:
      return { ...state, loading: false };
    case FETCH_JOBS_SUCCESS:
      pushData(state, action.payload.results);
      return { ...state, loading: false };
    default:
      return state;
  }
};
