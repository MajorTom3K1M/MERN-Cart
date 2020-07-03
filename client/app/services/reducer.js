import { combineReducers } from 'redux';
import customerReducer from './customers/reducer';
import adminReducer from './admin/reducer';
import productReducer from './products/reducer';

export default combineReducers({
    customer: customerReducer,
    admin: adminReducer,
    product: productReducer
})