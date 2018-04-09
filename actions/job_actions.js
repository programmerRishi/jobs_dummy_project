import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import queryString from 'qs';

import {
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_FAILED,
  FETCHING_JOBS,
  LIKE_JOB
} from './types';

const API_KEY = 'AIzaSyC1SoruU05DQn8Ck-lIIkmKacQQ3zWU-1Y';
const JOBS_ROOT_URL = 'https://api.indeed.com/ads/apisearch?';
const JOBS_QUERY_PARAMS = {
  publisher: '4201738803816157',
  format: 'json',
  v: '2',
  latlong: 1,
  radius: 10,
  q: 'javascript',
};

const buildJobsUrl = (zipCode) => {
  const query = queryString.stringify({ ...JOBS_QUERY_PARAMS, l: zipCode });
  return `${JOBS_ROOT_URL}${query}`;
};

export const fetchJobs = (region, navigate) => async dispatch => {
  try {
      console.log('fetching started');
      dispatch({ type: FETCHING_JOBS });
      const zipCode = await reverseGeocode(region, API_KEY);
      const url = buildJobsUrl(zipCode);
      const { data } = await axios.get(url);
      dispatch({ type: FETCH_JOBS_SUCCESS, payload: data });
      navigate();
  } catch (e) {
      dispatch({ type: FETCH_JOBS_FAILED });
      console.log(e);
    }
};

export const likeJob = (job) => {
  return {
    type: LIKE_JOB,
    payload: job
  };
};
