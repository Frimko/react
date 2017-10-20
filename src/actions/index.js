/**
 * Created by Frimko on 20.10.2017.
 * mailto ccc-car@yandex.ru.
 */
import api from 'api';
import {
    CUSTOMERS_FETCH_REQUEST_SUCCESS,
    PRODUCTS_FETCH_REQUEST_SUCCESS,
    FETCH_REQUEST_FAILURE,

    SHOW_LOADER,
    HIDE_LOADER,

    SHOW_CUSTOMERS_MODAL,
    HIDE_CUSTOMERS_MODAL,

    SHOW_PRODUCTS_MODAL,
    HIDE_PRODUCTS_MODAL,
} from 'constants'

export const showSpinner = {type: SHOW_LOADER}
export const hideSpinner = {type: HIDE_LOADER}

export const getAllItems = (type) => {
    let dispatchType;
    switch (type) {
        case 'customers':
            dispatchType = CUSTOMERS_FETCH_REQUEST_SUCCESS
            break;
        case 'products':
            dispatchType = PRODUCTS_FETCH_REQUEST_SUCCESS
            break;
        default:
            dispatchType = FETCH_REQUEST_FAILURE
            break;
    }
    return (dispatch) => {
        dispatch(showSpinner);
        api.getAllItems(type)
            .then(({data}) => {
                dispatch({
                    type: dispatchType,
                    payload: data
                })
            })
            .catch((result) => {
                dispatch({
                    type: FETCH_REQUEST_FAILURE,
                    payload: result
                })
            })
            .then(() => {
                dispatch(hideSpinner)
            })
    }
}

export const deleteItem = (type, id) => {
    return (dispatch) => {
        api.deleteItem(type, id)
            .catch((result) => {
                dispatch({
                    type: FETCH_REQUEST_FAILURE,
                    payload: result
                })
            })
            .then(() => {
                dispatch(getAllItems(type));
            })
    }
}

export const showUpdateModal = (type, fields, id) => {
    let dispatchType;
    switch (type) {
        case 'customers':
            dispatchType = SHOW_CUSTOMERS_MODAL
            break;
        case 'products':
            dispatchType = SHOW_PRODUCTS_MODAL
            break;
        default:
            dispatchType = FETCH_REQUEST_FAILURE
            break;
    }
    return {
        type: dispatchType,
        fields: fields,
        id: id,
        isUpdateType: true
    }
}
export const showAddModal = (type, fields) => {
    let dispatchType;
    switch (type) {
        case 'customers':
            dispatchType = SHOW_CUSTOMERS_MODAL
            break;
        case 'products':
            dispatchType = SHOW_PRODUCTS_MODAL
            break;
        default:
            dispatchType = FETCH_REQUEST_FAILURE
            break;
    }
    return {
        type: dispatchType,
        fields: fields,
        isUpdateType: false
    }
}

export const hideModal = (type) => {
    let dispatchType;
    switch (type) {
        case 'customers':
            dispatchType = HIDE_CUSTOMERS_MODAL
            break;
        case 'products':
            dispatchType = HIDE_PRODUCTS_MODAL
            break;
        default:
            dispatchType = FETCH_REQUEST_FAILURE
            break;
    }
    return {type: dispatchType}
}

export const addCustomer = (data) => {
    let type = 'customers';
    return (dispatch) => {
        api.setCustomer(data)
            .catch((result) => {
                dispatch({
                    type: FETCH_REQUEST_FAILURE,
                    payload: result
                })
            })
            .then(() => {
                dispatch(getAllItems(type));
                dispatch(hideModal(type));
            })
    }
}
export const updateCustomer = (id, data) => {
    let type = 'customers';
    return (dispatch) => {
        api.updateCustomer(id, data)
            .catch((result) => {
                dispatch({
                    type: FETCH_REQUEST_FAILURE,
                    payload: result
                })
            })
            .then(() => {
                dispatch(getAllItems(type));
                dispatch(hideModal(type));
            })
    }
}

export const addProduct = (data) => {
    let type = 'products';
    return (dispatch) => {
        api.setProduct(data)
            .catch((result) => {
                dispatch({
                    type: FETCH_REQUEST_FAILURE,
                    payload: result
                })
            })
            .then(() => {
                dispatch(getAllItems(type));
                dispatch(hideModal(type));
            })
    }
}
export const updateProduct = (id, data) => {
    let type = 'products';
    return (dispatch) => {
        api.updateProduct(id, data)
            .catch((result) => {
                dispatch({
                    type: FETCH_REQUEST_FAILURE,
                    payload: result
                })
            })
            .then(() => {
                dispatch(getAllItems(type));
                dispatch(hideModal(type));
            })
    }
}