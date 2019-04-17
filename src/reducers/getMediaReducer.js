import { GET_MEDIA, GET_ONE_MEDIA } from '../constants'

const initState = {
    medias: [],
    media: {}
}

export const getMediasReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_MEDIA: return { ...state, medias: action.payload }
        case GET_ONE_MEDIA: return { ...state, media: action.payload }
        default: return { ...state }
    }
}