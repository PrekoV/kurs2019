import { POST_MESSAGE, UPDATE_MEDIA, CREATE_MEDIA } from '../../constants'
import API from '../../services/api'

const postMessageAction = (messages, err) => {
    return {
        type: POST_MESSAGE,
        messages,
        err
    }
}

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

export const postMessage = (admin, message, date) => {
    return dispatch => {
        API.post("adminactions/messages", { admin, message, date }).then(res => {
            switch (res.status) {
                case 200: return dispatch(postMessageAction(res.data, null))
                default: return dispatch(postMessageAction(null, res.data.message))
            }
        })
    }
}

export const updateMedia = (formdata) => {
    return dispatch => {
        API.post("adminactions/media/download", formdata).then(res => {
            switch (res.status) {
                case 200: return dispatch(updateMediaAction(res.data, null))
                default: return dispatch(updateMediaAction(null, res.data.message))
            }
        })
    }
}

export const createMedia = (formdata) => {
    return dispatch => {
        API.post("adminactions/media/download", formdata).then(res => {
            switch (res.status) {
                case 200: return dispatch(createMediaAction(res.data, null))
                default: return dispatch(createMediaAction(null, res.data.message))
            }
        })
    }
}