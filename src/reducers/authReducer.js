import { AUTH_SUCCESS, AUTH_FAILED, LOGOUT } from '../constants'

const initState = {
    isAuth: false,
    user: {},
    message: ""
}

export const authReducer = (state = initState, action) => {
    switch (action.type) {
        case AUTH_SUCCESS: return { ...state, user: {name: action.name, token: action.token, img: action.img}, isAuth: action.auth}
        case AUTH_FAILED: return { ...state,  isAuth: action.auth, token: null, message: action.message }
        case LOGOUT: return { ...state, isAuth: false, token: null }
        default: return { ...state }
    }
}