import { combineReducers } from 'redux';
import JobsReducer from './reducer_jobs';
import SearchReducer from './reducer_search';

const rootReducer = combineReducers({
  jobs: JobsReducer,
  term: SearchReducer
});

export default rootReducer;
