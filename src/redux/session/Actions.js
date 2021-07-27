import { AuthenticationService } from '../../jwt/_services';
import {
    LOGIN,
    LOGOUT,
    SET_STORE_LOGO,
    SET_NOTIFICATIONS
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

export const set_notifications = (idrole) => {

    let url     = '/GEt/NoTifiCATION/useRS/ROLE/';
    url         = url+idrole;

    return dispatch => {
        axios
          .get(url)
          .then(res => {
            console.log(res.data);

            if(Number(res.data.count) > 0){
                let newOrder = res.data.rows;
                newOrder.sort(function(a, b) {
                    return Number(b.id) - Number(a.id);
                });

                console.log(newOrder);
                res.data.rows = newOrder;
            }

            dispatch({
                type: SET_NOTIFICATIONS,
                payload: res.data
            });
          })
          .catch(err => console.log(err + "action"))
    }
}



