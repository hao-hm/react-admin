import * as actions from '../common/actions'

//async action
export function fetchCategoryList(page = 1) {
  return (dispatch) => {
    return dispatch(actions.loadData(`/api/users?page=${page}`));
  }
}

export function deleteCategory(key) {
  return async (dispatch, getState) => {
    await dispatch(actions.deleteData(`/api/users/${key}`));
    dispatch(fetchCategoryList(getState().category.data.page));
  }
}
