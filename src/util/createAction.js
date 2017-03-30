import createActionType, {VIEW_MODE} from './actionType';
import fetchWrapper from './fetchWrapper';
import callAPI from './callAPI';

export function createAction(type, ...argNames) {
  return function(...args) {
    let action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]
    });
    return action
  }
}

export default function generateAction({module, api}) {
  const ACTION_TYPE = createActionType(module);
  const action = {
    requestStart: createAction(ACTION_TYPE.REQUEST_START),
    requestSuccess: createAction(ACTION_TYPE.REQUEST_SUCCESS, 'data'),
    requestError: createAction(ACTION_TYPE.REQUEST_ERROR, 'error'),

    fetchStart: createAction(ACTION_TYPE.FETCH_START),
    fetchSuccess: createAction(ACTION_TYPE.FETCH_SUCCESS, 'data', 'page', 'search'),
    fetchError: createAction(ACTION_TYPE.FETCH_ERROR, 'error'),

    createStart: createAction(ACTION_TYPE.CREATE_START),
    createSuccess: createAction(ACTION_TYPE.CREATE_SUCCESS, 'data'),
    createError: createAction(ACTION_TYPE.CREATE_ERROR, 'error'),

    updateStart: createAction(ACTION_TYPE.UPDATE_START),
    updateSuccess: createAction(ACTION_TYPE.UPDATE_SUCCESS, 'data'),
    updateError: createAction(ACTION_TYPE.UPDATE_ERROR, 'error'),

    deleteStart: createAction(ACTION_TYPE.DELETE_START),
    deleteSuccess: createAction(ACTION_TYPE.DELETE_SUCCESS),
    deleteError: createAction(ACTION_TYPE.DELETE_ERROR, 'error'),

    changeMode: createAction(ACTION_TYPE.CHANGE_MODE, 'mode'),

    setCurrent: createAction(ACTION_TYPE.SET_CURRENT, 'current')

  };

  action.fetch = ({url, page, sortField = '', sortOrder = '', search} = {}, key) => async (dispatch, getState) => {
    if(typeof search === 'undefined'){
      search = getState()[module].search
    }
    if(typeof page === 'undefined'){
      page = getState()[module].page
    }
    try {
      dispatch(action.fetchStart());
      let data = await callAPI(`${url || api}?page=${page || 1}&search=${search || ''}&sortBy=${sortField}&order=${sortOrder}`);
      dispatch(action.fetchSuccess(data, page, search));
    } catch(error) {
      dispatch(action.fetchError(error));
    }
  };

  action.delete = ({url, key}) => async (dispatch, getState) => {
    try {
      dispatch(action.deleteStart());
      let data = await callAPI(`${url || api}/${key}`, {method: 'delete'});
      dispatch(action.deleteSuccess());
      const currentPage = getState()[module].page;
      dispatch(action.fetch({page: currentPage}));
    } catch(error) {
      dispatch(action.deleteError(error));
      throw error;
    }
  };

  action.create = ({url, body}) => async (dispatch) => {
    try {
      dispatch(action.createStart());
      let data = await callAPI(url || api, {method: 'post', body});
      dispatch(action.createSuccess(data));
      dispatch(action.changeMode(VIEW_MODE));
      // dispatch(action.fetch());
    } catch(error) {
      dispatch(action.createError(error));
    }
  };

  action.update = ({url, key, body}) => async (dispatch) => {
    try {
      dispatch(action.updateStart());
      let data = await callAPI(`${url || api}/${key}`, {method: 'put', body});
      dispatch(action.updateSuccess(data));
      dispatch(action.changeMode(VIEW_MODE));
      // dispatch(action.fetch());
    } catch(error) {
      dispatch(action.updateError(error));
    }
  };

  return action;

}