import axios from 'axios';
import { adminAPI } from '../services/utils'

export const userService = {
    userLogin,
    checkSetup
}

function userLogin(email, password) {
    const requestOption = {
        method: 'POST',
        url: adminAPI + '/login',
        data: { 
            email, 
            password 
        }
    }
    return axios(requestOption)
        .then(res => {
            const { data: { user } } = res;
            return user;
        })
}

function checkSetup() {
    const requestOption = {
        method: 'GET',
        url: adminAPI + '/check_setup'
    }
    return axios(requestOption)
        .then(res => {
            const { data: { needSetup } } = res;
            return needSetup;
        })
}

function userSetup(usersName, userEmail, userPassword) {
    const requestOption = {
        method: 'POST',
        url: adminAPI + '/setup'
    }
}