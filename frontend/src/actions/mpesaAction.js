import axios from 'axios'

import { 
    MPESA_STK_PUSH_REQUEST,
    MPESA_STK_PUSH_SUCCESS, 
    MPESA_STK_PUSH_FAIL 
} 
from "../constants/mpesaConstants"




export const mpesaStkPush = (push) => async (dispatch, getState) => {
    try {
        dispatch({
            type: MPESA_STK_PUSH_REQUEST
        })

        //get current user info
        const {
            userLogin: { userInfo },
        } = getState()
        
        //send request with token
        const config = {
            headers: {
                'Content-type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }
        
        const { data } = await axios.post(
            `/api/payments/lnm-stk-push`,
            push,
            config
        )

        dispatch({
            type: MPESA_STK_PUSH_SUCCESS,
            payload: data
        })

    
    } catch(error) {
        dispatch({
            type: MPESA_STK_PUSH_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })

    }
}