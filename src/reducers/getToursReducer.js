import { GET_TOURS } from '../constants'

const initState = {
    tours: []
}

export const getToursReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_TOURS: return { ...state, tours: action.payload }
        default: return { ...state }
    }
}