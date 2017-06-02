import { SEARCH_JOBS } from '../actions/index';

export default function(state = '', action) {
  switch (action.type) {
  case SEARCH_JOBS:
    return action.payload;
  }
  return state;
}
