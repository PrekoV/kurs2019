import API from '../../services/api'
import { GET_MEDIA, GET_ONE_MEDIA } from '../../constants'

const getMediaAction = (payload) => {
    // console.log(payload)
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
        API.get('media').then(res => {
            // console.log(res.data)
            return dispatch(getMediaAction(res.data))
        })
    }
}

export const getOneMedia = (id) => {
    return (dispatch) => {
        API.get('media/' + id).then(res => {
            return dispatch(getOneMediaAction(res.data))
        })
    }
}