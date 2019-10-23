import { UPDATE_MEDIA, CREATE_MEDIA } from '../../constants'
import API from '../../services/api'

const updateMediaAction = (media, err) => {
    return {
        type: UPDATE_MEDIA,
        media,
        err
    }
}

const createMediaAction = (album, err) => {
    return {
        type: CREATE_MEDIA,
        album,
        err
    }
}

export const updateMedia = (formdata) => {
    return dispatch => {
        return API.post("adminactions/media/download", formdata).then(res => {
            dispatch(updateMediaAction(res.data, null))
        }).catch(e => {
            dispatch(updateMediaAction(null, res.data.message))
        })
    }
}

export const createMedia = (formdata) => {
    return dispatch => {
        return API.post("adminactions/media/download", formdata).then(res => {
            dispatch(createMediaAction(res.data, null))
        }).catch(e => {
            dispatch(createMediaAction(null, res.data.message))
        })
    }
}