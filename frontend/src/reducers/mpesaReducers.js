import { MPESA_STK_PUSH_REQUEST, MPESA_STK_PUSH_SUCCESS, MPESA_STK_PUSH_FAIL } from "../constants/mpesaConstants"



export const mpesaStkPushReducer = (state = {}, action) =>{
    switch(action.type) {
        case MPESA_STK_PUSH_REQUEST:
            return {loading: true}
        
        case MPESA_STK_PUSH_SUCCESS:
            return {loading: false, success: true, message: action.payload['ResponseDescription']}
        
        case MPESA_STK_PUSH_FAIL:
            return {loading: false, error: action.payload['errorMessage']}
           
        default:
            return state
    }
}