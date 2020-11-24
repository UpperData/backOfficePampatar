import { AuthenticationService } from '../../jwt/_services';
import {
    LOGIN,
    LOGOUT,
    SET_STORE_LOGO
} from '../constants/';
import axios from 'axios';

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

export const set_store_logo = () => {
    let urlGet = '/seller/get/logo';
    return dispatch => {
        axios
          .get(urlGet)
          .then(res => {
            if(res.data.data.result){
                dispatch({
                    type: SET_STORE_LOGO,
                    payload: res.data.data.rsShop.logo.data
                })
            }
          })
          .catch(err => console.log(err + "action"))
    }
}



