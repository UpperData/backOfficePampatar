import {
    SET_ROLE,
    SET_BACKOFFICE_MENU
  } from "../constants";
  
  const INIT_STATE = {
    role: {},
    menu: null
  };
  
  export default (state = INIT_STATE, action) => {
    switch (action.type) {
      case SET_ROLE:
        return {
            ...state,
            role: action.payload
        };
      case SET_BACKOFFICE_MENU:
        return {
            ...state,
            menu: action.payload
        };
      default:
        return state;
    }
  };
  