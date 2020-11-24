import {
    SET_ROLE,
    SET_BACKOFFICE_MENU,
    SET_PHONE_TYPES,
    SET_STORE_TYPES,
    SET_SALES_CHANNELS,
    SET_DOCUMENT_TYPES,
    SET_PEOPLE_TYPES,
    SET_REGIONS,
    SET_GENDERS,
    SET_NATIONALITIES,
    SET_BANKS,
    SET_ADDRESS_TYPES
  } from "../constants";
  
  const INIT_STATE = {
    role: {},
    menu: null,
    phoneTypes:     null,
    storeTypes:     null,
    salesChannels:  null,
    documentTypes:  null,
    peopleTypes:    null,
    regions:        null,
    nationalities:  null,
    genders:        null,
    banks:          null,
    addressTypes:    null
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
      case SET_PHONE_TYPES:
        return {
            ...state,
            phoneTypes: action.payload
        };
      case SET_STORE_TYPES:
        return {
            ...state,
            storeTypes: action.payload
        };
      case SET_SALES_CHANNELS:
        return {
            ...state,
            salesChannels: action.payload
        };
      case SET_DOCUMENT_TYPES:
        return {
            ...state,
            documentTypes: action.payload
        };
      case SET_PEOPLE_TYPES:
        return {
            ...state,
            peopleTypes: action.payload
        };
      case SET_REGIONS:
        return {
            ...state,
            regions: action.payload
        };
      case SET_GENDERS:
        return {
            ...state,
            genders: action.payload
        };
      case SET_NATIONALITIES:
        return {
            ...state,
            nationalities: action.payload
        };
      case SET_BANKS:
        return {
            ...state,
            banks: action.payload
        };
      case SET_ADDRESS_TYPES:
        return {
            ...state,
            addressTypes: action.payload
        };
      default:
        return state;
    }
  };
  