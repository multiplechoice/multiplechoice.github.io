import { combineReducers } from 'redux';
import JobsReducer from './reducer_jobs';
import SearchReducer from './reducer_search';
import JobReducer from './reducer_job';

const rootReducer = combineReducers({
  jobs: JobsReducer,
  searchTerm: SearchReducer,
  selectedJob: JobReducer
});

export default rootReducer;
