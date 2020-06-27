import { CHECK_SETUP, SETUP, USER_LOGIN_REQUEST } from './actionTypes';

const initialState = {
    needSetup: null,
    // isAdmin: true
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CHECK_SETUP:
            return {
                needSetup: action.needSetup
            };
        case SETUP:
            return {
                needSetup: action.needSetup
            };
        case USER_LOGIN_REQUEST:
            return {
                ...state, 
                ...action.user
            };
        default:
            return state;
    }
}