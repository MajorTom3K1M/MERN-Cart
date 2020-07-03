import axios from 'axios';
import { userService } from '../../util/user.services';
import { adminAPI } from '../utils'
import { CHECK_SETUP, SETUP, USER_LOGIN_REQUEST } from './actionTypes';

export const checkSetup = (callback) => {
    return dispatch => {
        userService.checkSetup()
            .then(
                needSetup => {
                    if (callback) {
                        callback(needSetup)
                    }
                    dispatch(request(needSetup))
                }
            )
    }
    function request(needSetup) { return { type: CHECK_SETUP, needSetup } }
}

export const userSetup = (usersName, userEmail, userPassword, cb) => {
    return async (dispatch) => {
        try {
            var res = await axios
                .post(adminAPI + '/setup_action', { usersName, userEmail, userPassword })
            dispatch({
                type: SETUP,
                payload: false
            });
            if (cb) {
                cb();
            }
        } catch (err) {
            // Deal with error later...
        }
    }
}

export const userLogin = (userEmail, password) => {
    return dispatch => {
        userService.userLogin(userEmail, password)
            .then(
                user => {
                    dispatch(request(extractUser(user)))
                }
            )
    }
    function request(user) { return { type: USER_LOGIN_REQUEST, user } }
    function extractUser(user) {
        return {
            user: userEmail,
            isAdmin: user.isAdmin,
            usersName: user.usersName,
            userId: user._id
        }
    }
}