import API from '../services/api'
import { GET, GET_TOURS } from '../constants'

const getToursAction = (payload) => {
    return {
        type: GET_TOURS,
        payload
    }
}

export const getTours = () => {
    return function (dispatch) {
        API(GET, "/tours").then(res => {
            return res.json()
        }).then(json => {
            return dispatch(getToursAction(json))
        })
    }
}