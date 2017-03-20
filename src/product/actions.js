import generateAction from '../util/createAction';
import {MODULE_NAME, API} from './constant';

const action = generateAction({module: MODULE_NAME, api: API.product});

action.filterProducts = (key) => async (dispatch, getState) => {
  if(key==='all'){
    await dispatch(action.fetch());
  }else{
    await dispatch(action.fetch({url: `/categories/${key}/product`}));
  }
};

export default action;