import axios from 'axios';
import { customerService } from '../../util/services/customer.service';
import { customerAPI } from '../utils'
import { history } from '../../helpers'
import { LOGIN_ERROR, LOGIN, LOGOUT } from './actionTypes';

export const loginAction = (loginEmail, loginPassword, callback) => {
    return dispatch => {
        customerService.login(loginEmail, loginPassword)
            .then(
                customer => {
                    dispatch(request(extractCustomer(customer)));
                    history.push('/customer/account');
                }
            );
    }
    function request(customer) { return { type: LOGIN, customer } }
    function extractCustomer(customer) { 
        return { 
            customerPresent: true,
            customerId: customer._id,
            customerEmail: customer.email,
            customerCompany: customer.company,
            customerFirstname: customer.firstName,
            customerLastname: customer.lastName,
            customerAddress1: customer.address1,
            customerAddress2: customer.address2,
            customerCountry: customer.country,
            customerState: customer.state,
            customerPostcode: customer.postcode,
            customerPhone: customer.phone
        } 
    }
}

export const logoutAction = () => {
    return async (dispatch) => {
        console.log("TEST LOGOUT WORK")
        try {
            await axios
                .post(customerAPI + '/logout')
            dispatch({
                type: LOGOUT,
                payload: {
                    customerAddress1: null,
                    customerAddress2: null,
                    customerCountry: null,
                    customerEmail: null,
                    customerFirstname: null,
                    customerLastname: null,
                    customerPhone: null,
                    customerPostcode: null,
                    customerPresent: null,
                    customerState: null,
                }
            })
        } catch(err) {
            console.log(err)
            // Deal with error later... 
        }
    }
}

export const login = (data) => {
}
