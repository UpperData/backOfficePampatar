import {
    LOGIN,
    LOGOUT,
    SET_STORE_LOGO,
    SET_NOTIFICATIONS
  } from "../constants/";
  
  const INIT_STATE = {
    auth:           false,
    token:          '',
    userData :      null,
    storeLogo:      null,
    notifications:  []
  };
  
  export default (state = INIT_STATE, action) => {
    switch (action.type) {
      case LOGIN:
        return {
            ...state,
            auth: true,
            userData: action.payload
        };
      case LOGOUT:
        return {
            ...state,
            auth: false,
            token: '',
            userData : null,
            storeLogo: null
        };
      case SET_STORE_LOGO:
        return {
            ...state,
            storeLogo: action.payload,
        };
      case SET_NOTIFICATIONS:
        return {
            ...state,
            notifications: action.payload,
        };
      default:
        return state;
    }
  };
  