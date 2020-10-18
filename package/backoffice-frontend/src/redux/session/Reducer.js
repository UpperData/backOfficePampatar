import {
    LOGIN,
    LOGOUT
  } from "../constants/";
  
  const INIT_STATE = {
    auth: false,
    token: '',
    userData : null
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
            userData : null
        };
      default:
        return state;
    }
  };
  