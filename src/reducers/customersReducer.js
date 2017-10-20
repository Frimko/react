import { CUSTOMERS_FETCH_REQUEST_SUCCESS, SHOW_CUSTOMERS_MODAL, HIDE_CUSTOMERS_MODAL } from 'constants'

const defaultState = {
    dataList: [],
    modal: {
        show: false,
        id: null,
        isUpdateType: false,
        fields: []
    }
};

const customersReducer = (state = defaultState, action) => {
    switch (action.type) {
        case CUSTOMERS_FETCH_REQUEST_SUCCESS:
            return {
                ...state,
                dataList: [...action.payload]
            };
        case SHOW_CUSTOMERS_MODAL:
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
        case HIDE_CUSTOMERS_MODAL:
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

export default customersReducer;