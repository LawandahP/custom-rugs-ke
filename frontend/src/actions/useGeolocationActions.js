import { 
    GET_LOCATION_REQUEST,
    GET_LOCATION_SUCCESS,
    GET_LOCATION_FAIL
} from '../constants/useGeolocationConstants'



export const getGeolocation = (location) => async (dispatch) => {
    try {
        dispatch({
            type: GET_LOCATION_REQUEST
        })
        
        const { data } = navigator.geolocation.getCurrentPosition() 

        dispatch({
            type: GET_LOCATION_SUCCESS,
            payload: data
        })


    } catch(error) {
        dispatch({
            type: GET_LOCATION_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })

    }
}

