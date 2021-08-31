
export const CART_ADD_ITEM = 'CART_ADD_ITEM'
export const CART_REMOVE_ITEM = 'CART_REMOVE_ITEM'
export const CART_SAVE_SHIPPING_ADDRESS = 'CART_SAVE_SHIPPING_ADDRESS'

export const CART_SAVE_PAYMENT_METHOD = 'CART_SAVE_PAYMENT_METHOD'
export const CART_CLEAR_ITEMS = 'CART_CLEAR_ITEMS'


export function commafy( num ) {
    var str = num.toString().split('.');
    if (str[0].length >= 3) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 3) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
}


