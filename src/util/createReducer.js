import createActionType from './actionType';

export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}

export function createReducers(initialState, module) {
  const ACTION_TYPE = createActionType(module);
  return function (state = initialState, action) {
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
}