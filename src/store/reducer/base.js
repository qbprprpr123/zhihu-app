// import * as TYPES from '../action-types';
import { cloneDeep } from 'lodash';

const initial = {
  info: null,
};

export default function baseReducer(state = initial, action) {
  const newState = cloneDeep(state);
  switch (action.type) {
    default:
      break;
  }
  return newState;
}
