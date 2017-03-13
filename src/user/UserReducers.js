import {
  REQUEST_START, REQUEST_ERROR, REQUEST_END,
  FETCH_SUCCESS, DELETE_SUCCESS, CREATE_SUCCESS, UPDATE_SUCCESS,
  CHANGE_MODE, VIEW_MODE
} from './UserActions';

const INITIAL_STATE = {
  data: [],
  currentPage: 1,
  loading: 0,
  error: '',
  selectedIds: [],
  current: null,
  mode: VIEW_MODE
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_START:
      return {...state, loading: state.loading + 1 };
    case REQUEST_ERROR :
      return {...state, error: action.error};
    case REQUEST_END:
      return {...state, loading: state.loading - 1};


    case FETCH_SUCCESS:
      return {...state, data: action.data};

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