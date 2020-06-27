import axios from 'axios';
import { utilAPI, adminAPI } from '../services/utils'

export const checkLoggedIn = async () => {
    const response = await axios.get(utilAPI + '/session', { withCredentials: true });
    const isLoggedIn = response.data.session.customerPresent
    const isLoggedInAsAdmin = response.data.session.isAdmin
    delete response.data.session.cookie

    let preloadedState = {};
    if (isLoggedIn) {
        const {
            customerPresent, customerId, customerEmail, customerCompany,
            customerFirstname, customerLastname, customerAddress1, customerAddress2,
            customerCountry, customerPostcode, customerPhone
        } = response.data.session
        preloadedState = {
            customer: {
                customerPresent,
                customerId,
                customerEmail,
                customerCompany,
                customerFirstname,
                customerLastname,
                customerAddress1,
                customerAddress2,
                customerCountry,
                customerPostcode,
                customerPhone
            }
        }
    }

    if (isLoggedInAsAdmin) {
        const {
            isAdmin, user, usersName, userId
        } = response.data.session
        preloadedState = {
            ...preloadedState,
            admin: {
                isAdmin,
                user,
                usersName,
                userId
            }
        }
    }

    return preloadedState
}