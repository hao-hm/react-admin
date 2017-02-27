
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
function requestStart() {
  return {
    type: REQUEST_START
  }
}

function requestEnd() {
  return {
    type: REQUEST_END
  }
}

export function fetchSuccess(data) {
  return {
    type: FETCH_SUCCESS,
    data,
  };
}

export function requestError(error) {
  return {
    type: REQUEST_ERROR,
    error,
  };
}

//async action
//fetch posts
export function fetchData(page = 1) {
  return (dispatch) => {
    dispatch(requestStart());
    return fetch(`/api/users?page=${page}`)
      .then(response => response.json())
      .then(res => dispatch(fetchSuccess(res)))
      .catch(error => dispatch(requestError(error)))
      .then(()=> dispatch(requestEnd()));
  };
}

//Change mode
export function changeMode(mode) {
  return {
    type: CHANGE_MODE,
    mode
  }
}


