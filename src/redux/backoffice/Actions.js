import {
    SET_ROLE,
    SET_BACKOFFICE_MENU,
    SET_PHONE_TYPES,
    SET_STORE_TYPES,
    SET_SALES_CHANNELS,
    SET_DOCUMENT_TYPES,
    SET_PEOPLE_TYPES,
    SET_REGIONS,
    SET_NATIONALITIES,
    SET_GENDERS,
    SET_BANKS,
    SET_ADDRESS_TYPES,
    SET_GENERAL_DAYS,
    SET_BID_TYPES,
    SET_DISPONIBILITY_TYPES
} from '../constants';
import axios from 'axios'

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

export const set_general_days = () => {
    let url = '/getWeek/generalsDays/';
    return dispatch => {
        axios
          .get(url)
          .then(res => {
            if(res.data.data.result){
                dispatch({
                    type: SET_GENERAL_DAYS,
                    payload: res.data.data
                })
            }
          })
          .catch(err => console.log(err + "action"))
    }
}

export const set_bid_types = () => {
    let url = '/sKU/types/get';
    return dispatch => {
        axios
          .get(url)
          .then(res => {
            console.log(res.data);
            if(res.data){
                dispatch({
                    type: SET_BID_TYPES,
                    payload: res.data
                })
            }
          })
          .catch(err => console.log(err + "action"))
    }
}

export const set_disponibility_types = () => {
    let url = '/DispONIBility/GET/alL';
    return dispatch => {
        axios
          .get(url)
          .then(res => {
            //console.log(res.data);
            if(res.data){
                dispatch({
                    type: SET_DISPONIBILITY_TYPES,
                    payload: res.data
                })
            }
          })
          .catch(err => console.log(err + "action"))
    }
}


export const set_phone_types = () => {
    let urlPhoneType = '/phoneType';
    return dispatch => {
        axios
          .get(urlPhoneType)
          .then(res => {
            if(res.data.data.result){
                dispatch({
                    type: SET_PHONE_TYPES,
                    payload: res.data.data
                })
            }
          })
          .catch(err => console.log(err + "action"))
    }
}


export const set_store_types = () => {
    let urlStoreType = '/storeType';
    return dispatch => {
        axios
          .get(urlStoreType)
          .then(res => {
            if(res.data.data.result){
                dispatch({
                    type: SET_STORE_TYPES,
                    payload: res.data.data
                })
            }
          })
          .catch(err => console.log(err + "action"))
    }
}

export const set_sales_channels = () => {
    let urlSalesChannels = '/salesChannels';
    return dispatch => {
        axios
          .get(urlSalesChannels)
          .then(res => {
            if(res.data.data.result){
                dispatch({
                    type: SET_SALES_CHANNELS,
                    payload: res.data.data
                })
            }
          })
          .catch(err => console.log(err + "action"))
    }
}

export const set_document_types = () => {
    let urlDocType = '/docType';
    return dispatch => {
        axios
          .get(urlDocType)
          .then(res => {
            if(res.data.data.result){
                dispatch({
                    type: SET_DOCUMENT_TYPES,
                    payload: res.data.data
                })
            }
          })
          .catch(err => console.log(err + "action"))
    }
}

export const set_people_types = () => {
    let urlPeopleType = '/peopleType';
    return dispatch => {
        axios
          .get(urlPeopleType)
          .then(res => {
                dispatch({
                    type: SET_PEOPLE_TYPES,
                    payload: res.data
                })
          })
          .catch(err => console.log(err + "action"))
    }
}

export const set_regions = () => {
    let urlRegions = '/regions/';
    return dispatch => {
        axios
          .get(urlRegions)
          .then(res => {
            if(res.data.data.result){
                dispatch({
                    type: SET_REGIONS,
                    payload: res.data.data
                })
            }
          })
          .catch(err => console.log(err + "action"))
    }
}

export const set_genders = () => {
    let urlGenders = '/genders';
    return dispatch => {
        axios
          .get(urlGenders)
          .then(res => {
            if(res.data.data.result){
                dispatch({
                    type: SET_GENDERS,
                    payload: res.data.data
                })
            }
          })
          .catch(err => console.log(err + "action"))
    }
}

export const set_nationalities = () => {
    let urlNationalities = '/nationalities';
    return dispatch => {
        axios
          .get(urlNationalities)
          .then(res => {
            if(res.data.data.result){
                dispatch({
                    type: SET_NATIONALITIES,
                    payload: res.data.data
                })
            }
          })
          .catch(err => console.log(err + "action"))
    }
}

export const set_banks = () => {
    let urlBanks = '/getbanks';
    return dispatch => {
        axios
          .get(urlBanks)
          .then(res => {
            if(res.data.data.result){
                dispatch({
                    type: SET_BANKS,
                    payload: res.data.data
                })
            }
          })
          .catch(err => console.log(err + "action"))
    }
}

export const set_address_types = () => {
    let urlBanks = '/addressType';
    return dispatch => {
        axios
          .get(urlBanks)
          .then(res => {
            if(res.data.data.result){
                dispatch({
                    type: SET_ADDRESS_TYPES,
                    payload: res.data.data
                })
            }
          })
          .catch(err => console.log(err + "action"))
    }
}


