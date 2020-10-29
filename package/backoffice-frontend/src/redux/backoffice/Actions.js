import {
    SET_BACKOFFICE_MENU,
    SET_ROLE
} from '../constants';
//import { AuthenticationService } from '../../jwt/_services';

export const set_backoffice_menu = (payload) => {
    return {
        type: SET_BACKOFFICE_MENU,
        payload
    }
}

export const set_role = (payload) => {
    localStorage.setItem('role', payload.id);
    return {
        type: SET_ROLE,
        payload
    }
}

