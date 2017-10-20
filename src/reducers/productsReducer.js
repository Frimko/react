import { PRODUCTS_FETCH_REQUEST_SUCCESS, SHOW_PRODUCTS_MODAL, HIDE_PRODUCTS_MODAL } from 'constants'

const defaultState = {
    dataList: [],
    modal: {
        show: false,
        id: null,
        isUpdateType: false,
        fields: []
    }
};

const productsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case PRODUCTS_FETCH_REQUEST_SUCCESS:
            return {
                ...state,
                dataList: [...action.payload]
            };
        case SHOW_PRODUCTS_MODAL:
            return {
                ...state,
                modal: {
                    ...state.modal,
                    show: true,
                    fields: action.fields,
                    id: action.id,
                    isUpdateType: action.isUpdateType
                }
            };
        case HIDE_PRODUCTS_MODAL:
            return {
                ...state,
                modal: {
                    ...state.modal,
                    show: false,
                    isUpdateType: false,
                    id: null,
                    fields: []
                }
            };
        default:
            return state
    }
};

export default productsReducer;