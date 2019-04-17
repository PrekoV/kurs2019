import API from '../services/api'
import { GET, GET_MEDIA, GET_ONE_MEDIA } from '../constants'

const getMediaAction = (payload) => {
    return {
        type: GET_MEDIA,
        payload
    }
}

const getOneMediaAction = (payload) => {
    return {
        type: GET_ONE_MEDIA,
        payload
    }
}

export const getMedia = () => {
    return (dispatch) => {
        API(GET, 'media').then(res => {
            return res.json()
        }).then(json => {
            return dispatch(getMediaAction(json))
        })
    }
}

export const getOneMedia = (id) => {
    return (dispatch) => {
        API(GET, 'media/' + id).then(res => {
            return res.json()
        }).then(json => {
            return dispatch(getOneMediaAction(json))
        })
    }
}