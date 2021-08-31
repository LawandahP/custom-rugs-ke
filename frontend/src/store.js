import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

//reducers
import { currencyConvertReducer } from './reducers/currencyConvertReducers'

import { productListReducer, productDetailsReducer, productDeleteReducer, productCreateReducer, productUpdateReducer, productReviewCreateReducer, productTopRatedReducer
 } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer, userDeleteReducer, userUpdateReducer } from './reducers/userReducers'
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListMyReducer, orderListReducer, orderDeliverReducer } from './reducers/orderReducers'
import { useGeolocationReducer } from './reducers/useGeolocationReducer'
import { galleryListReducer } from './reducers/galleryReducers'

const reducer = combineReducers({
     
     useGeolocation: useGeolocationReducer,

     productList: productListReducer,
     productDetails: productDetailsReducer,
     productDelete: productDeleteReducer,
     productCreate: productCreateReducer,
     productUpdate: productUpdateReducer,
     productReviewCreate: productReviewCreateReducer,
     productTopRated: productTopRatedReducer,

     cart: cartReducer, 

     userLogin: userLoginReducer,
     userRegister: userRegisterReducer,
     userDetails: userDetailsReducer,
     userUpdateProfile: userUpdateProfileReducer,
     userList: userListReducer,
     userUpdate: userUpdateReducer,
     userDelete: userDeleteReducer,

     orderCreate: orderCreateReducer,
     orderDetails: orderDetailsReducer,
     orderPay: orderPayReducer,
     orderListMy: orderListMyReducer,
     orderList: orderListReducer,
     orderDeliver: orderDeliverReducer,

     galleryList: galleryListReducer,
     
     currencyConvert: currencyConvertReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
     JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ?
     JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
     JSON.parse(localStorage.getItem('shippingAddress')) : {}

// add Items from local storage define in actions to initial state 
const initialState = {
     cart: { 
          cartItems: cartItemsFromStorage,
          shippingAddress: shippingAddressFromStorage
     },
     userLogin: { userInfo: userInfoFromStorage },

}

const middleWare = [thunk]

const store = createStore(reducer, initialState,
     composeWithDevTools(applyMiddleware(...middleWare)))

export default store  