import createActionType, {VIEW_MODE} from '../util/actionType';
import {MODULE_NAME} from './categoryConstant';
const ACTION_TYPE = createActionType(MODULE_NAME);

const INITIAL_STATE = {
  data: [],
  page: 1,
  loading: 0,
  error: null,
  current: null,
  mode: VIEW_MODE
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTION_TYPE.FETCH_START:
    case ACTION_TYPE.DELETE_START:
    case ACTION_TYPE.CREATE_START:
    case ACTION_TYPE.UPDATE_START:
      return {...state, loading: state.loading + 1 };

    case ACTION_TYPE.FETCH_SUCCESS:
      return {...state, data: action.data, page: action.page, loading: state.loading - 1, error: null};

    case ACTION_TYPE.DELETE_SUCCESS:
    case ACTION_TYPE.CREATE_SUCCESS:
    case ACTION_TYPE.UPDATE_SUCCESS:
      return {...state, loading: state.loading - 1, error: null};

    case ACTION_TYPE.FETCH_ERROR:
    case ACTION_TYPE.DELETE_ERROR:
    case ACTION_TYPE.CREATE_ERROR:
    case ACTION_TYPE.UPDATE_ERROR:
      return {...state, error: action.error, loading: state.loading - 1};

    case ACTION_TYPE.CHANGE_MODE:
      return {...state, mode: action.mode};

    case ACTION_TYPE.SET_CURRENT:
      return {...state, current: action.current};



    default:
      return state;
  }
}

export const getCurrentMode = (state) => state[MODULE_NAME].mode;
