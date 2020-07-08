import axios from 'axios';
import { customerAPI } from '../../services/utils'

export const customerService = {
    login
}

function login(loginEmail, loginPassword) {
    const requestOption = {
        method: 'POST',
        url: customerAPI + '/login',
        data: { 
            loginEmail, 
            loginPassword 
        }
    }
    return axios(requestOption)
        .then((res) => {
            const { data: { customer } } = res;
            return customer;
        })
}