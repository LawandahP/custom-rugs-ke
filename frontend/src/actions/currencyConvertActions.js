import axios from 'axios'

import { 
    CURRENCY_CONVERT_REQUEST,
    CURRENCY_CONVERT_SUCCESS,
    CURRENCY_CONVERT_FAIL,
    CURRENCY_CONVERT_RESET,

} from '../constants/currencyConverterConstants'



export const currencyConvert = () => async (dispatch) => {
    try {
        dispatch({
            type: CURRENCY_CONVERT_REQUEST
        })

        const config = {
            headers: {
                'Content-type':'application/json'
            }
        }
        
        const { data } = await axios.get(
            'http://api.openrates.io/latest',
            config
        )

        dispatch({
            type: CURRENCY_CONVERT_SUCCESS,
            payload: data
        })
        

    } catch(error) {
        dispatch({
            type: CURRENCY_CONVERT_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })

    }
}