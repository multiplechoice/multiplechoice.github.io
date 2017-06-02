import { FETCH_JOBS } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
  case FETCH_JOBS:
    return action.payload.data;
  }
  return state;
}
