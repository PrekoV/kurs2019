import { AUTH_SUCCESS, AUTH_FAILED, LOGOUT, GET } from '../../constants'
import API from '../../services/api'

const authSuccessAction = (payload) => {
    return {
        type: AUTH_SUCCESS,
        auth: true,
        name: payload.login,
        token: payload.token,
        img: payload.img
    }
}

const authFailedAction = (message) => {
    return {
        type: AUTH_FAILED,
        auth: false,
        token: null,
        message
    }
}

const logoutAction = () => {
    return {
        type: LOGOUT,
        auth: false,
        token: null
    }
}

export const login = (login, password) => {
    return dispatch => {
        API.post("admin/login", { login, password }).then(res => {
            switch (res.status) {
                case 200: return dispatch(authSuccessAction(res.data))
                case 500: () => {
                    localStorage.clear()
                    return dispatch(authFailedAction(res.data.message))
                }
                case 404: () => {
                    localStorage.clear()
                    return dispatch(authFailedAction(res.data.message))
                }
                default: return dispatch(authFailedAction("There is some problems with server..."))
            }
        }), rej => {
            console.log(rej)
        }
    }
}

export const logout = () => {
    return dispatch => {
        localStorage.clear()
        return dispatch(logoutAction())
    }
}

export const registered = () => {
    return dispatch => {
        API.get('admin/' + localStorage.getItem("id")).then(res => {
            switch (res.status) {
                case 200: return dispatch(authSuccessAction(res.data))
                case 500: () => {
                    localStorage.clear()
                    return dispatch(authFailedAction(res.data.message))
                }
                case 404: () => {
                    localStorage.clear()
                    return dispatch(authFailedAction(res.data.message))
                }
                default: return dispatch(authFailedAction("There is some problems with server..."))
            }
        })
    }
}