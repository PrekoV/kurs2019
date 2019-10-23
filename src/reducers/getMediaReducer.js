import { GET_MEDIA, GET_ONE_MEDIA, UPDATE_MEDIA, CREATE_MEDIA, } from '../constants'

const initState = {
    medias: [],
    media: {},
    err: ""
}

export const getMediasReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_MEDIA: console.log(action.payload)
            return { ...state, medias: action.payload }
        case GET_ONE_MEDIA: return { ...state, media: action.payload }
        case UPDATE_MEDIA: return { ...state, media: action.media, err: action.err }
        case CREATE_MEDIA: return { ...state, medias: state.medias.push(action.album) }
        default: return { ...state }
    }
}