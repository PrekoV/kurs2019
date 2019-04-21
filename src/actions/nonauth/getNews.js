import API from '../../services/api'
import { GET, GET_NEWS } from '../../constants'

const getNewsAction = (payload) => {
    return {
        type: GET_NEWS,
        payload
    }
}

export const getNews = () => {
    return function (dispatch) {
        API.get("news").then(res => {
            return dispatch(getNewsAction(res.data))
        })
    }
}