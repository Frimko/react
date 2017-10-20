/**
 * Created by Frimko on 20.10.2017.
 * mailto ccc-car@yandex.ru.
 */
import axios from 'axios';

const endpoint = '/api/';

axios.defaults.baseURL = endpoint;

export const getAllItems = (type) => {
    return axios.get(`/${type}`)
}
export const getItem = (type, id) => {
    return axios.get(`/${type}/${id}`)
}

export const deleteItem = (type, id) => {
    return axios.delete(`/${type}/${id}`)
}

export const setCustomer = ({name, address, phone}) => {
    return axios.post('/customers', {
            name: name,
            address: address,
            phone: phone
        }
    )
}
export const updateCustomer = (id, {name, address, phone}) => {
    return axios.put(`/customers/${id}`, {
        name: name,
        address: address,
        phone: phone
    })
}
export const setProduct = ({name, price}) => {
    return axios.post('/products', {
            name: name,
        price: price,
        }
    )
}
export const updateProduct = (id, {name, price}) => {
    return axios.put(`/products/${id}`, {
        name: name,
        price: price,
    })
}


export default {
    getAllItems: getAllItems,
    setCustomer: setCustomer,
    updateCustomer: updateCustomer,
    setProduct: setProduct,
    updateProduct: updateProduct,
    getItem: getItem,
    deleteItem: deleteItem
}