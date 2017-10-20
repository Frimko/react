import { SHOW_LOADER, HIDE_LOADER } from 'constants'
const defaultState = {loader: false};

const customersReducer = (state = defaultState, action) => {
        switch (action.type) {
            case SHOW_LOADER:
                return {
                    ...state,
                    loader: true
                };
            case HIDE_LOADER:
                return {
                    ...state,
                    loader: false
                };
            default:
                return state
        }
    };

export default customersReducer;