import { combineReducers } from 'redux';
import customerReducer from './customers/reducer';
import adminReducer from './admin/reducer';

export default combineReducers({
    customer: customerReducer,// adminReducer
    admin: adminReducer
})