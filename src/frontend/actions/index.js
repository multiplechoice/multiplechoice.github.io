import axios from 'axios';

const URL = 'https://wr7eqcl297.execute-api.eu-central-1.amazonaws.com/dev/all';

export const FETCH_JOBS = 'fetch_jobs';

export function fetchJobs() {
  const request = axios.get(`${URL}`);

  return {
    type: FETCH_JOBS,
    payload: request
  };
}
