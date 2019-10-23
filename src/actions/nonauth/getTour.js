import API from '../../services/api'
import { GET_TOURS } from '../../constants'

const getToursAction = (payload) => {
    return {
        type: GET_TOURS,
        payload
    }
}

export const getTours = () => {
    return function (dispatch) {
        API.get("/tours").then(res => {
            return dispatch(getToursAction(res.data))
        })
    }
}