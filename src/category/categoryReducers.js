import {
  REQUEST_START, REQUEST_ERROR, REQUEST_END,
  FETCH_SUCCESS, DELETE_SUCCESS, CREATE_SUCCESS, UPDATE_SUCCESS,
  CHANGE_MODE, VIEW_MODE
} from '../common/actions';
import {MODULE} from './categoryConstant';

const INITIAL_STATE = {
  data: {},
  loading: 0,
  error: ''
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_START:
      return {...state, loading: state.loading + 1 };
    case REQUEST_ERROR :
      return {...state, error: action.error, loading: state.loading - 1};
    case REQUEST_END:
    case DELETE_SUCCESS:
      return {...state, loading: state.loading - 1};


    case FETCH_SUCCESS:
      return {...state, data: action.data, loading: state.loading - 1};

    //change mode
    case CHANGE_MODE:
      return {
        ...state,
        mode: action.mode
      };

    default:
      return state;
  }
}


//selector
export const getError = state => state[MODULE].error;