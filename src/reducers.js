import { combineReducers } from 'redux';
import user from './user'
import category from './category'
import product from './product'
export default combineReducers({
  user: user.reducers,
  category: category.reducers,
  product: product.reducers
});