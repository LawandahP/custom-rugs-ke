import { 
    CURRENCY_CONVERT_REQUEST,
    CURRENCY_CONVERT_SUCCESS,
    CURRENCY_CONVERT_FAIL,
    CURRENCY_CONVERT_RESET,

} from '../constants/currencyConverterConstants'


export const currencyConvertReducer = (state = {loading: true, result: null, fromCurrency: "KES", toCurrency:"USD", amount: Number, currencies: []}, action) => {
    switch(action.type) {
        case CURRENCY_CONVERT_REQUEST:
            return {
                ...state,
                loading: true
            }
        
        case CURRENCY_CONVERT_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }
        case CURRENCY_CONVERT_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        
        default:
            return state
    }
}

