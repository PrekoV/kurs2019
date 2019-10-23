import { GET_PRODUCTS, GET_PRODUCT } from '../constants'

const initState = {
    prodList: [],
    product: {}
}

export const getProductsReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_PRODUCTS: return { ...state, prodList: action.payload }
        case GET_PRODUCT: return { ...state, product: action.payload }
        default: return { ...state }
    }
}