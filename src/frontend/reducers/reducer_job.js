import { SELECT_JOB } from '../actions/index';

export default function(state = '', action) {
  switch (action.type) {
  case SELECT_JOB:
    return action.payload;
  }
  return state;
}
