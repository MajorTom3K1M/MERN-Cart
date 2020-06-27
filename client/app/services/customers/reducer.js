import { LOGIN_ERROR, LOGIN, LOGOUT } from './actionTypes';

const initialState = {
    customerPresent: false
}

export default function(state = initialState, action) {
    switch (action.type) {
        case LOGIN: 
            return {
                customerPresent: true,
                ...action.customer
            };
        case LOGOUT:
            return {
                ...action.payload
            };
        case LOGIN_ERROR:
            return {
                message: action.payload
            };
        default:
            return state;
    }
}