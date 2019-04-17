import API from '../services/api'
import { GET, GET_PRODUCTS, GET_PRODUCT } from '../constants'

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
        API(GET, "/").then(res => {
            return res.json()
        }).then(json => {
            return dispatch(getProductsAction(json))
        })
    }
}

export const getProdOne = (url) => {
    return function (dispatch) {
        API(GET, url).then(res => {
            return res.json()
        }).then(json => {
            return dispatch(getOneProductAction(json))
        })
    }
}