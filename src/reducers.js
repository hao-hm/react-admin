import { combineReducers } from 'redux';
import user from './user'
import category from './category'
export default combineReducers({
  user: user.reducers,
  category: category.reducers
});