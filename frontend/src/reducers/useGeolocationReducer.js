import { 
    GET_LOCATION_REQUEST,
    GET_LOCATION_SUCCESS,
    GET_LOCATION_FAIL
} from '../constants/useGeolocationConstants'



export const useGeolocationReducer = (state = { coordinates: {} }, action) => {
    switch(action.type) {

        case GET_LOCATION_REQUEST:
            return {loading: true, ...state}
        
        case GET_LOCATION_SUCCESS:
            return { loading: false, coordinates: {
                lat: action.payload.lat,
                lng: action.payload.lng
            }}
        
        case GET_LOCATION_FAIL:
            return {loading: false, error: action.payload}
        
        default:
            return state

    }
}