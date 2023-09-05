// import * as TYPES from '../action-types';
import { cloneDeep } from 'lodash';

const initial = {
  list: null,
};

export default function storeReducer(state = initial, action) {
  const newState = cloneDeep(state);
  switch (action.type) {
    default:
      break;
  }
  return newState;
}
