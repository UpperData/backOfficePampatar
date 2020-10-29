import { AuthenticationService } from '../../jwt/_services';
import {
    LOGIN,
    LOGOUT
} from '../constants/';

export const handleLogin = (payload) => {
    if(payload.hasOwnProperty('token')){
        localStorage.setItem('token', payload.token);
        payload.token = null;
    }

    localStorage.setItem('userData', JSON.stringify(payload));

    return {
        type: LOGIN,
        payload
    }
}

export const handleLogout = () => {
    AuthenticationService.logout();
    return {
        type: LOGOUT,
        payload: true
    }
}

