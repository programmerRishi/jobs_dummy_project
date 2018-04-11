import {
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_FAILED,
  FETCHING_JOBS
} from '../actions/types';

const INITIAL_STATE = { jobs: [], loading: false };

// const pushData = (state, results) => {
//   let count = 0;
//   for (let i = 0; i < results.length; i++) {
//     for (let j = 0; j < state.jobs.length; j++) {
//       // jobkey is the property of every job object having a specific key
//        if (results[i].jobkey === state.jobs[j].jobkey) count++;
//     }
//     if (count === 0) state.jobs.push(results[i]);
//     count = 0;
//   }
// };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHING_JOBS:
      return { ...state, loading: true };
    case FETCH_JOBS_FAILED:
      return { ...state, loading: false };
    case FETCH_JOBS_SUCCESS:
      // pushData(state, action.payload.results);
      return { ...state, jobs: action.payload.results, loading: false };
    default:
      return state;
  }
};
