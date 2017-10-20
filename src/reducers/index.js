import {combineReducers} from 'redux'
import customersReducer from './customersReducer'
import productsReducer from './productsReducer'
import mainReducer from './mainReducer'

const reducers = combineReducers({
    customers: customersReducer,
    products: productsReducer,
    main: mainReducer,
});

//const reducers = ()=>({});

export default reducers