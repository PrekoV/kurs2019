import { GET_NEWS, POST_MESSAGE } from '../constants'

const initState = {
    messages: [],
    err: ""
}

export const getNewsReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_NEWS: return { ...state, messages: action.payload }
        case POST_MESSAGE: return { ...state, messages: action.messages, err: action.err }
        default: return { ...state }
    }
}