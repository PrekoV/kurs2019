import API from '../../services/api'
import { GET, GET_PRODUCTS, GET_PRODUCT } from '../../constants'

const getProductsAction = (payload) => {
    return {
        type: GET_PRODUCTS,
        payload
    }
}

const getOneProductAction = (payload) => {
    return {
        type: GET_PRODUCT,
        payload
    }
}

export const getProds = () => {
    return function (dispatch) {
        API.get("products").then(res => {
            return dispatch(getProductsAction(res.data))
        })
    }
}

export const getProdOne = (name) => {
    return function (dispatch) {
        API.get("products/one?name=" + name).then(res => {
            return dispatch(getOneProductAction(res.data))
        })
    }
}