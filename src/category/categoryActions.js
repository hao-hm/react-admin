import generateAction from '../util/createAction';
import {MODULE_NAME, API} from './categoryConstant';

export const action = generateAction({module: MODULE_NAME, api: API.categories});
