import axios from 'axios';

const URL = 'https://eutzzt9nql.execute-api.eu-central-1.amazonaws.com/dev/all?results=500&days=21';

export const FETCH_JOBS = 'fetch_jobs';
export const SEARCH_JOBS = 'search_jobs';
export const SELECT_JOB = 'select_job';

export function fetchJobs() {
  const request = axios.get(`${URL}`);

  return {
    type: FETCH_JOBS,
    payload: request
  };
}

export function searchJobs(term) {
  return {
    type: SEARCH_JOBS,
    payload: term
  };
}

export function selectJob(job) {
  return {
    type: SELECT_JOB,
    payload: job
  };
}
