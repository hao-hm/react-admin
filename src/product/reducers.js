import {MODULE_NAME} from './constant';
import {createReducers} from '../util/createReducer';
import createInitialState from '../util/createInitialState';

const INITIAL_STATE = createInitialState(MODULE_NAME);
const productReducers = createReducers(INITIAL_STATE, MODULE_NAME);
//Extending reducers
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {


    default:
      return productReducers(state, action);
  }
}