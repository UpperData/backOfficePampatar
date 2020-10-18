import {
    LOGIN,
    LOGOUT
} from '../constants/';

export const handleLogin = (payload) => {
    return {
        type: LOGIN,
        payload
    }
}

export const handleLogout = (payload) => {
    return {
        type: LOGOUT,
        payload
    }
}

