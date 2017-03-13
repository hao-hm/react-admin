// import fetchWrapper from '../util/fetchWrapper';

// Export Constants
export const REQUEST_START = 'REQUEST_START';
export const REQUEST_ERROR = 'REQUEST_ERROR';
export const REQUEST_END = 'REQUEST_END';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const DELETE_SUCCESS = 'DELETE_SUCCESS';
export const CREATE_SUCCESS = 'CREATE_SUCCESS';
export const UPDATE_SUCCESS = 'UPDATE_SUCCESS';
export const CHANGE_MODE = 'CHANGE_MODE';
export const VIEW_MODE = 'VIEW_MODE';
export const CREATE_MODE = 'CREATE_MODE';
export const EDIT_MODE = 'EDIT_MODE';
export const SELECT = 'SELECT';
export const PAGINATION = 'PAGINATION';

//common sync action
export function requestStart() {
  return {
    type: REQUEST_START
  }
}

export function requestEnd() {
  return {
    type: REQUEST_END
  }
}

export function requestError(error) {
  return {
    type: REQUEST_ERROR,
    error,
  };
}


export function fetchSuccess(data) {
  return {
    type: FETCH_SUCCESS,
    data,
  };
}

export function deleteSuccess(data) {
  return {
    type: DELETE_SUCCESS,
    data,
  };
}

//Change mode
export function changeMode(mode) {
  return {
    type: CHANGE_MODE,
    mode
  }
}


//async action
export function fetchData(url) {
  return (dispatch, getState) => {
    dispatch(requestStart());
    return fetchWrapper(url)
      .then(res => dispatch(fetchSuccess(res)))
      .catch(error => dispatch(requestError(error)))
      .then(()=> {
        dispatch(requestEnd());
        return getState();
      });
  };
}


export const loadData = (url) => async (dispatch) => {
  try {
    dispatch(requestStart());
    let data = await fetchWrapper(url);
    dispatch(fetchSuccess(data));
  } catch(error) {
    dispatch(requestError(error));
  }
};

export const deleteData = (url) => async (dispatch) => {
  try {
    dispatch(requestStart());
    let data = await fetchWrapper(url, 'delete');
    dispatch(deleteSuccess(data));
  } catch (error){
    dispatch(requestError(error));
  }
};
